import { NextResponse } from 'next/server'
import path from 'path'
import { sendDetectionRegistrationEmail } from '@/lib/email'
import { ensureSmgVideosBucket, supabaseSmgAdmin } from '@/lib/supabase'
import { ensureDetectionsTable, smgPool } from '@/lib/db'

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

    await ensureDetectionsTable()

    // Generate Detection Number
    const numero_detection = `DET-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

    // Extract optional fields and map frontend to DB schema
    const email = getText(formData, 'email')
    const club_actuel = getText(formData, 'club_actuel')
    const niveau_actuel = getText(formData, 'niveau_actuel') || 'N/A'
    const parent_email = getText(formData, 'parent_email')

    // Insert into PostgreSQL
    const result = await smgPool.query(
      `
        insert into detection_registrations (
          nom, prenom, sexe, date_naissance, lieu_naissance, telephone, email, zone_residence,
          pied_dominant, club_actuel, niveau_actuel, experience_competitive, comment_identifie,
          parent_nom, parent_lien, parent_telephone, parent_email, urgence_nom, urgence_telephone,
          photo_recente_url, numero_detection
        ) values (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21
        ) returning id
      `,
      [
        payload.nom,
        payload.prenom,
        payload.sexe,
        payload.date_naissance,
        'N/A', // lieu_naissance (not in form)
        'N/A', // telephone (not in form)
        email,
        payload.zone_residence,
        payload.pied_dominant,
        club_actuel,
        niveau_actuel,
        payload.experience, // experience_competitive
        JSON.stringify(comment_identifie),
        payload.parent_nom,
        payload.parent_lien,
        payload.parent_telephone,
        parent_email,
        payload.parent_urgence, // urgence_nom
        'Voir urgence_nom', // urgence_telephone
        photo_recente_url,
        numero_detection
      ]
    )

    const registrationId = result.rows[0]?.id as number

    // Send confirmation email
    const contactEmail = getText(formData, 'parent_email') || payload.email

    const { error: messageError } = await supabaseSmgAdmin.from('site_messages').insert({
      type: 'detection',
      name: `${payload.parent_nom} (Enfant: ${payload.prenom} ${payload.nom})`,
      email: contactEmail,
      phone: payload.parent_telephone,
      message: `Nouvelle inscription aux Détections avec le numéro ${numero_detection}.`,
      payload,
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
