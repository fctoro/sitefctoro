import { NextResponse } from 'next/server'
import path from 'path'
import { sendDetectionRegistrationEmail } from '@/lib/email'
import { ensureSmgVideosBucket, supabaseSmgAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

const REQUIRED_TEXT_FIELDS = [
  'nom',
  'prenom',
  'sexe',
  'date_naissance',
  'zone_residence',
  'pied_dominant',
  'experience',
  'parent_nom',
  'parent_lien',
  'parent_telephone',
  'parent_urgence',
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
    const formData = await request.formData()
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

    // Generate Detection Number
    const numero_detection = `DET-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

    // Extract optional fields and map frontend to DB schema
    const email = getText(formData, 'email')
    const club_actuel = getText(formData, 'club_actuel')
    const niveau_actuel = getText(formData, 'niveau_actuel') || 'N/A'
    const parent_email = getText(formData, 'parent_email')

    // Insert into PostgreSQL via Supabase REST API to avoid IPv4 pool connection issues
    const { data: registration, error: regError } = await supabaseSmgAdmin.from('detection_registrations').insert({
      nom: payload.nom,
      prenom: payload.prenom,
      sexe: payload.sexe,
      date_naissance: payload.date_naissance,
      lieu_naissance: 'N/A', // lieu_naissance (not in form)
      telephone: 'N/A', // telephone (not in form)
      email: email,
      zone_residence: payload.zone_residence,
      pied_dominant: payload.pied_dominant,
      club_actuel: club_actuel,
      niveau_actuel: niveau_actuel,
      experience_competitive: payload.experience,
      comment_identifie: JSON.stringify(comment_identifie),
      parent_nom: payload.parent_nom,
      parent_lien: payload.parent_lien,
      parent_telephone: payload.parent_telephone,
      parent_email: parent_email,
      urgence_nom: payload.parent_urgence,
      urgence_telephone: 'Voir urgence_nom',
      photo_recente_url: photo_recente_url,
      numero_detection: numero_detection
    }).select('id').single()

    if (regError) {
      throw new Error(`Failed to insert detection registration: ${regError.message}`)
    }

    const registrationId = registration.id

    // Send confirmation email
    const contactEmail = getText(formData, 'parent_email') || payload.email

    const { error: messageError } = await supabaseSmgAdmin.from('site_messages').insert({
      type_message: 'detection',
      contact_nom: `${payload.parent_nom} (Enfant: ${payload.prenom} ${payload.nom})`,
      contact_email: contactEmail,
      contact_telephone: payload.parent_telephone,
      message: `Nouvelle inscription aux Détections avec le numéro ${numero_detection}.`,
      metadata: payload,
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
