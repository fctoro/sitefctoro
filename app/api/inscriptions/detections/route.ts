import { NextResponse } from 'next/server'
import path from 'path'
import { sendDetectionRegistrationEmail } from '@/lib/email'
import { ensureSmgVideosBucket, supabaseSmgAdmin } from '@/lib/supabase'
import { ensureDetectionsTable } from '@/lib/db'

export const runtime = 'nodejs'

const REQUIRED_TEXT_FIELDS = [
  'nom',
  'prenom',
  'sexe',
  'date_naissance',
  'zone_residence',
  'pied_dominant',
  'poste_principal',
  'poste_secondaire',
  'experience',
  'parent_nom',
  'parent_lien',
  'parent_telephone',
] as const

const MAX_FILE_SIZE_BYTES = 4 * 1024 * 1024 // 4MB as stated in the UI

function getText(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

function getFileInfo(value: FormDataEntryValue | null) {
  if (!value || typeof value === 'string') return null
  const file = value as File
  if (!file.name) return null
  return {
    filename: file.name,
    type: file.type,
    size: file.size,
  }
}

function sanitizeFilename(value: string) {
  const clean = value.replace(/[^a-zA-Z0-9._-]+/g, '_')
  return clean.length > 0 ? clean : 'document'
}

export async function POST(request: Request) {
  try {
    await ensureDetectionsTable()
    const formData = await request.formData()

    // Capture ALL text fields submitted to avoid data loss
    const allTextData = Object.fromEntries(
      Array.from(formData.entries())
        .filter(([_, value]) => typeof value === 'string')
        .map(([key, value]) => [key, (value as string).trim()])
    )

    const payload = Object.fromEntries(
      REQUIRED_TEXT_FIELDS.map((key) => [key, getText(formData, key)])
    ) as Record<string, string>

    const missingFields = REQUIRED_TEXT_FIELDS.filter((key) => !payload[key])
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Veuillez remplir tous les champs obligatoires.' },
        { status: 400 }
      )
    }

    // Duplicate Check: Verify if a registration with the same nom, prenom and date_naissance already exists
    const { data: existingRegistrations, error: checkError } = await supabaseSmgAdmin
      .from('detection_registrations')
      .select('id')
      .ilike('nom', payload.nom)
      .ilike('prenom', payload.prenom)
      .eq('date_naissance', payload.date_naissance)
      .limit(1)

    if (checkError) {
      console.error('Error checking for duplicate registration:', checkError)
      // Continue anyway, it could be a transient issue, or handle it as error.
    } else if (existingRegistrations && existingRegistrations.length > 0) {
      return NextResponse.json(
        { error: 'Une candidature pour ce joueur a déjà été enregistrée.' },
        { status: 400 }
      )
    }

    // Validation de l'âge minimum (8 ans)
    const dateStr = payload.date_naissance
    if (dateStr) {
      const parts = dateStr.split('-')
      const birthYear = parseInt(parts[0], 10)
      const birthMonth = parseInt(parts[1], 10) - 1
      const birthDay = parseInt(parts[2], 10)

      if (!isNaN(birthYear) && !isNaN(birthMonth) && !isNaN(birthDay)) {
        const today = new Date()
        let calculatedAge = today.getFullYear() - birthYear
        const m = today.getMonth() - birthMonth
        if (m < 0 || (m === 0 && today.getDate() < birthDay)) {
          calculatedAge--
        }
        if (calculatedAge < 8) {
          return NextResponse.json(
            { error: 'Le joueur doit être âgé de 8 ans minimum.' },
            { status: 400 }
          )
        }
      } else {
        return NextResponse.json(
          { error: 'Date de naissance invalide.' },
          { status: 400 }
        )
      }
    }

    // Process checkbox/radio array for "comment_identifie"
    const comment_identifie = formData.getAll('comment_identifie').map(String)

    // Handle photo
    let photo_recente_url = null
    const photoValue = formData.get('photo_recente')
    const photoInfo = getFileInfo(photoValue)

    if (photoInfo && photoValue && typeof photoValue !== 'string') {
      const file = photoValue as File
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: 'La photo doit faire 4MB ou moins.' },
          { status: 400 }
        )
      }

      await ensureSmgVideosBucket()

      const arrayBuffer = await file.arrayBuffer()
      const safeName = sanitizeFilename(photoInfo.filename)
      const ext = path.extname(safeName)
      const base = ext ? safeName.slice(0, -ext.length) : safeName
      const uniqueName = `detection-${Date.now()}-${base}${ext}`

      const { error: uploadError } = await supabaseSmgAdmin.storage
        .from('videos')
        .upload(`documents/${uniqueName}`, arrayBuffer, {
          contentType: file.type || 'image/jpeg',
          upsert: false,
        })

      if (uploadError) {
        throw new Error(
          `Supabase upload failed for photo: ${uploadError.message || JSON.stringify(uploadError)}`
        )
      }

      const { data } = supabaseSmgAdmin.storage.from('videos').getPublicUrl(`documents/${uniqueName}`)
      photo_recente_url = data.publicUrl
    }

    // Helper function for uploading optional documents
    async function uploadOptionalDocument(formKey: string, humanName: string) {
      const val = formData.get(formKey)
      const info = getFileInfo(val)
      if (info && val && typeof val !== 'string') {
        const file = val as File
        if (file.size > MAX_FILE_SIZE_BYTES) {
          throw new Error(`Le fichier pour ${humanName} dépasse 4MB.`)
        }
        await ensureSmgVideosBucket()
        const arrayBuffer = await file.arrayBuffer()
        const safeName = sanitizeFilename(info.filename)
        const ext = path.extname(safeName)
        const base = ext ? safeName.slice(0, -ext.length) : safeName
        const uniqueName = `detection-${formKey}-${Date.now()}-${base}${ext}`

        const { error: uploadError } = await supabaseSmgAdmin.storage
          .from('videos')
          .upload(`documents/${uniqueName}`, arrayBuffer, {
            contentType: file.type || 'application/octet-stream',
            upsert: false,
          })

        if (uploadError) {
          throw new Error(`Erreur lors de l'upload de ${humanName}: ${uploadError.message}`)
        }
        const { data } = supabaseSmgAdmin.storage.from('videos').getPublicUrl(`documents/${uniqueName}`)
        return data.publicUrl
      }
      return null
    }

    const fiche_9e_url = await uploadOptionalDocument('fiche_9e', 'Fiche 9ème')
    const carnet_vaccination_url = await uploadOptionalDocument('carnet_vaccination', 'Carnet de vaccination')
    const acte_naissance_url = await uploadOptionalDocument('acte_naissance', 'Acte de naissance')
    const piece_identite_parent_url = await uploadOptionalDocument('piece_identite_parent', "Pièce d'identité parent")

    // Generate Detection Number
    let numero_detection = ''
    for (let attempts = 0; attempts < 5; attempts++) {
      numero_detection = `DET-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
      const { data: existingNum } = await supabaseSmgAdmin
        .from('detection_registrations')
        .select('id')
        .eq('numero_detection', numero_detection)
        .limit(1)
      if (!existingNum || existingNum.length === 0) {
        break // Number is unique
      }
    }

    // Extract optional fields and map frontend to DB schema
    const email = getText(formData, 'email')
    const club_actuel = getText(formData, 'club_actuel')
    const niveau_actuel = getText(formData, 'niveau_actuel') || 'N/A'
    const parent_email = getText(formData, 'parent_email')

    // Read additional fields for new columns
    const poste_principal = getText(formData, 'poste_principal')
    const poste_secondaire = getText(formData, 'poste_secondaire')
    const ecole = getText(formData, 'ecole')
    const club_precedent = getText(formData, 'club_precedent')
    const annees_pratique = getText(formData, 'annees_pratique')

    // Insert into PostgreSQL via Supabase REST API to avoid IPv4 pool connection issues
    const { data: registration, error: regError } = await supabaseSmgAdmin.from('detection_registrations').insert({
      nom: payload.nom,
      prenom: payload.prenom,
      sexe: payload.sexe,
      date_naissance: payload.date_naissance,
      lieu_naissance: payload.zone_residence, // Save zone_residence here so it appears automatically
      telephone: 'N/A', // telephone (not in form)
      email: email,
      zone_residence: payload.zone_residence,
      pied_dominant: payload.pied_dominant,
      poste_principal: poste_principal,
      poste_secondaire: poste_secondaire,
      ecole: ecole,
      club_precedent: club_precedent,
      annees_pratique: annees_pratique,
      club_actuel: club_actuel,
      niveau_actuel: niveau_actuel,
      experience_competitive: payload.experience,
      comment_identifie: JSON.stringify(comment_identifie),
      parent_nom: payload.parent_nom,
      parent_lien: payload.parent_lien,
      parent_telephone: payload.parent_telephone,
      parent_email: parent_email,
      urgence_nom: '',
      urgence_telephone: '',
      photo_recente_url: photo_recente_url,
      fiche_9e_url: fiche_9e_url,
      carnet_vaccination_url: carnet_vaccination_url,
      acte_naissance_url: acte_naissance_url,
      piece_identite_parent_url: piece_identite_parent_url,
      numero_detection: numero_detection
    }).select('id').single()

    if (regError) {
      throw new Error(`Failed to insert detection registration: ${regError.message}`)
    }

    const registrationId = registration.id

    // Send confirmation email
    const contactEmail = getText(formData, 'parent_email') || payload.email

    const { error: messageError } = await supabaseSmgAdmin.from('site_messages').insert({
      type: 'detection',
      name: `${payload.parent_nom} (Enfant: ${payload.prenom} ${payload.nom})`,
      email: contactEmail,
      phone: payload.parent_telephone,
      message: `Nouvelle inscription aux Détections avec le numéro ${numero_detection}.`,
      payload: { 
        id: registrationId, 
        numero_detection, 
        ...allTextData 
      },
    })

    if (messageError) {
      console.error('Failed to insert into SMG site_messages:', messageError)
    }

    if (contactEmail) {
      await sendDetectionRegistrationEmail({
        to: contactEmail,
        parentName: payload.parent_nom,
        childName: `${payload.prenom} ${payload.nom}`,
        detectionNumber: numero_detection
      }).catch((err) => console.error("Erreur d'envoi email:", err))
    }

    return NextResponse.json({
      message: "Votre candidature aux détections a été enregistrée avec succès. Merci de vérifier votre boîte e-mail.",
      id: registrationId,
      numero_detection
    })
  } catch (error) {
    console.error('Erreur inscription détections:', error)
    return NextResponse.json(
      { error: "Impossible d'enregistrer la candidature pour le moment." },
      { status: 500 }
    )
  }
}
