import { NextResponse } from 'next/server'
import path from 'path'
import { sendRegistrationEmail } from '@/lib/email'
import { ensureSmgVideosBucket, supabaseSmgAdmin } from '@/lib/supabase'

export const runtime = 'nodejs'

const REQUIRED_TEXT_FIELDS = [
  'program',
  'child_first_name',
  'child_last_name',
  'child_birth_date',
  'child_gender',
  'child_address',
  'child_school',
  'guardian_name',
  'guardian_email',
  'guardian_phone',
  'emergency_name',
  'emergency_relation',
  'emergency_phone',
  'uniform_top_size',
  'uniform_short_size',
  'payment_plan',
  'payment_method',
  'parent_signature',
] as const

const DOCUMENT_FIELDS = [
  'document_photo_id',
  'document_birth_certificate',
  'document_parent_id',
] as const

const CONSENT_FIELDS = [
  'consent_media',
  'consent_health',
  'consent_emergency',
  'consent_accuracy',
] as const

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024
const PROGRAM_AGE_RANGES: Record<'fcToro' | 'tiToro', { min: number; max: number }> = {
  tiToro: { min: 2, max: 5 },
  fcToro: { min: 6, max: 18 },
}

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

function parseDateOnly(value: string) {
  const [year, month, day] = value.split('-').map((part) => Number(part))
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

function toDateOnly(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate())
}

function isWithinRange(birthDate: Date, minDate: Date, maxDate: Date) {
  const birth = toDateOnly(birthDate).getTime()
  const min = toDateOnly(minDate).getTime()
  const max = toDateOnly(maxDate).getTime()
  return birth >= min && birth <= max
}

export async function POST(request: Request) {
  try {
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

    const birthDate = parseDateOnly(payload.child_birth_date)
    if (!birthDate || Number.isNaN(birthDate.getTime())) {
      return NextResponse.json(
        { error: 'Date de naissance invalide.' },
        { status: 400 }
      )
    }

    const programKey =
      payload.program === 'tiToro' || payload.program === 'fcToro'
        ? payload.program
        : 'fcToro'
    const range = PROGRAM_AGE_RANGES[programKey]
    const today = toDateOnly(new Date())
    const minDate = new Date(today.getFullYear() - range.max, 0, 1)
    const maxDate = new Date(today.getFullYear() - range.min, 11, 31)

    if (!isWithinRange(birthDate, minDate, maxDate)) {
      return NextResponse.json(
        {
          error: `L'inscription est reservee aux joueurs entre ${range.min} et ${range.max} ans pour ce programme.`,
        },
        { status: 400 }
      )
    }

    const consents = CONSENT_FIELDS.reduce<Record<string, boolean>>((acc, key) => {
      acc[key] = getText(formData, key) === 'yes'
      return acc
    }, {})

    if (!consents.consent_accuracy) {
      return NextResponse.json(
        { error: 'Veuillez confirmer que les informations sont exactes.' },
        { status: 400 }
      )
    }

    const missingDocuments = DOCUMENT_FIELDS.filter((key) => {
      const fileValue = formData.get(key)
      if (!fileValue || typeof fileValue === 'string') return true
      const file = fileValue as File
      return !file.name
    })

    if (missingDocuments.length > 0) {
      return NextResponse.json(
        { error: 'Veuillez televerser tous les documents requis.' },
        { status: 400 }
      )
    }

    const oversizedDocument = DOCUMENT_FIELDS.find((key) => {
      const fileValue = formData.get(key)
      if (!fileValue || typeof fileValue === 'string') return false
      const file = fileValue as File
      return file.size > MAX_FILE_SIZE_BYTES
    })

    if (oversizedDocument) {
      return NextResponse.json(
        { error: 'Chaque document doit faire 5MB ou moins.' },
        { status: 400 }
      )
    }

    await ensureSmgVideosBucket()

    const orderedUniforms = [
      getText(formData, 'uniform_order_uniforme_jeux1') === 'uniforme_jeux1'
        ? 'uniforme_jeux1'
        : null,
      getText(formData, 'uniform_order_uniforme_jeux2') === 'uniforme_jeux2'
        ? 'uniforme_jeux2'
        : null,
      getText(formData, 'uniform_order_uniforme_jeux3') === 'uniforme_jeux3'
        ? 'uniforme_jeux3'
        : null,
      getText(formData, 'uniform_order_tracksuit') === 'tracksuit' ? 'tracksuit' : null,
      getText(formData, 'uniform_order_backpack') === 'backpack' ? 'backpack' : null,
    ].filter((value): value is string => Boolean(value))

    const { data: registration, error: registrationError } = await supabaseSmgAdmin
      .from('player_registrations')
      .insert({
        program: payload.program,
        child_first_name: payload.child_first_name,
        child_last_name: payload.child_last_name,
        child_birth_date: payload.child_birth_date,
        child_gender: payload.child_gender,
        child_address: payload.child_address,
        child_school: payload.child_school,
        child_soccer_experience: getText(formData, 'child_soccer_experience'),
        guardian_name: payload.guardian_name,
        guardian_email: payload.guardian_email,
        guardian_phone: payload.guardian_phone,
        guardian_address: getText(formData, 'guardian_address'),
        emergency_name: payload.emergency_name,
        emergency_relation: payload.emergency_relation,
        emergency_phone: payload.emergency_phone,
        emergency_email: getText(formData, 'emergency_email'),
        emergency_address: getText(formData, 'emergency_address'),
        uniform_top_size: payload.uniform_top_size,
        uniform_short_size: payload.uniform_short_size,
        preferred_numbers: getText(formData, 'preferred_numbers'),
        payment_plan: payload.payment_plan,
        payment_method: payload.payment_method,
        signature_name: payload.parent_signature,
        consents,
        ordered_uniforms: orderedUniforms,
        financial_commitment_name: getText(formData, 'engagement_name'),
        financial_commitment_date: getText(formData, 'engagement_date'),
        financial_commitment_phone: getText(formData, 'engagement_phone'),
        financial_commitment_signature: getText(formData, 'engagement_signature'),
      })
      .select('id')
      .single()

    if (registrationError || !registration) {
      throw new Error(
        `Supabase insert failed: ${registrationError?.message || 'unknown error'}`
      )
    }

    const registrationId = Number(registration.id)
    if (Number.isNaN(registrationId)) {
      throw new Error('Invalid registration id returned by Supabase.')
    }

    for (const docKey of DOCUMENT_FIELDS) {
      const fileValue = formData.get(docKey)
      const info = getFileInfo(fileValue)
      if (!info || !fileValue || typeof fileValue === 'string') continue

      const file = fileValue as File
      const arrayBuffer = await file.arrayBuffer()
      const safeName = sanitizeFilename(info.filename)
      const ext = path.extname(safeName)
      const base = ext ? safeName.slice(0, -ext.length) : safeName
      const uniqueName = `${registrationId}-${docKey}-${Date.now()}-${base}${ext}`

      const { error: uploadError } = await supabaseSmgAdmin.storage
        .from('videos')
        .upload(`documents/${uniqueName}`, arrayBuffer, {
          contentType: file.type || 'application/octet-stream',
          upsert: false,
        })

      if (uploadError) {
        throw new Error(
          `Supabase upload failed for ${docKey}: ${uploadError.message || JSON.stringify(uploadError)}`
        )
      }

      const { data } = supabaseSmgAdmin.storage.from('videos').getPublicUrl(`documents/${uniqueName}`)
      const publicPath = data.publicUrl

      const { error: documentError } = await supabaseSmgAdmin
        .from('player_registration_documents')
        .insert({
          registration_id: registrationId,
          doc_key: docKey,
          filename: info.filename,
          content_type: info.type,
          size_bytes: info.size,
          path: publicPath,
        })

      if (documentError) {
        throw new Error(
          `Supabase document insert failed for ${docKey}: ${documentError.message || JSON.stringify(documentError)}`
        )
      }
    }

    const childFullName = `${payload.child_first_name} ${payload.child_last_name}`.trim()

    const { error: messageError } = await supabaseSmgAdmin.from('site_messages').insert({
      type: 'joueur',
      name: `${payload.guardian_name} (Enfant: ${childFullName})`,
      email: payload.guardian_email,
      phone: payload.guardian_phone,
      message: `Nouvelle inscription Joueur confirmée pour ${childFullName} (${payload.program}).`,
      payload: {
        id: registrationId,
        registration_id: registrationId,
        child_id: registrationId,
        child_name: childFullName,
        child_first_name: payload.child_first_name,
        child_last_name: payload.child_last_name,
        ...allTextData,
      },
    })

    if (messageError) {
      console.error('Failed to insert into SMG site_messages:', messageError)
    }

    await sendRegistrationEmail({
      to: payload.guardian_email,
      guardianName: payload.guardian_name,
      childName: childFullName,
      program: payload.program,
    }).catch((err) => console.error("Erreur d'envoi email:", err))

    return NextResponse.json({
      message:
        "Inscription enregistree. Merci de verifier votre boite email pour confirmer l'inscription.",
      id: registrationId,
    })
  } catch (error) {
    console.error('Erreur inscription joueur:', error)
    const message =
      error instanceof Error && process.env.NODE_ENV !== 'production'
        ? error.message
        : "Impossible d'enregistrer l'inscription pour le moment."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
