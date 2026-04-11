import { NextResponse } from 'next/server'
import path from 'path'
import { mkdir, writeFile } from 'fs/promises'
import { ensurePlayersTables, ensureSiteMessagesTable, pool } from '@/lib/db'
import { sendRegistrationEmail } from '@/lib/email'

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

function calculateAge(birthDate: Date, now: Date) {
  let age = now.getFullYear() - birthDate.getFullYear()
  const monthDiff = now.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
    age -= 1
  }
  return age
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
    const payload = Object.fromEntries(
      REQUIRED_TEXT_FIELDS.map((key) => [key, getText(formData, key)])
    ) as Record<string, string>

    const missingFields = REQUIRED_TEXT_FIELDS.filter((key) => !payload[key])
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: 'Veuillez remplir tous les champs obligatoires.',
        },
        { status: 400 }
      )
    }

    const birthDate = parseDateOnly(payload.child_birth_date)
    if (!birthDate || Number.isNaN(birthDate.getTime())) {
      return NextResponse.json(
        {
          error: 'Date de naissance invalide.',
        },
        { status: 400 }
      )
    }

    const programKey =
      payload.program === 'tiToro' || payload.program === 'fcToro'
        ? payload.program
        : 'fcToro'
    const range = PROGRAM_AGE_RANGES[programKey]
    const today = toDateOnly(new Date())
    const minDate = new Date(
      today.getFullYear() - range.max,
      today.getMonth(),
      today.getDate()
    )
    const maxDate = new Date(
      today.getFullYear() - range.min,
      today.getMonth(),
      today.getDate()
    )
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

    const missingConsents = Object.values(consents).some((value) => !value)
    if (missingConsents) {
      return NextResponse.json(
        {
          error: 'Veuillez accepter toutes les autorisations requises.',
        },
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
        {
          error: 'Veuillez televerser tous les documents requis.',
        },
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
        {
          error: 'Chaque document doit faire 5MB ou moins.',
        },
        { status: 400 }
      )
    }

    await ensurePlayersTables()
    await ensureSiteMessagesTable()

    const insertQuery = `
      insert into player_registrations (
        program,
        child_first_name,
        child_last_name,
        child_birth_date,
        child_gender,
        child_address,
        child_school,
        child_soccer_experience,
        guardian_name,
        guardian_email,
        guardian_phone,
        guardian_address,
        emergency_name,
        emergency_relation,
        emergency_phone,
        emergency_email,
        emergency_address,
        uniform_top_size,
        uniform_short_size,
        preferred_numbers,
        payment_plan,
        payment_method,
        signature_name,
        consents
      ) values (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24
      )
      returning id
    `

    const values = [
      payload.program,
      payload.child_first_name,
      payload.child_last_name,
      payload.child_birth_date,
      payload.child_gender,
      payload.child_address,
      payload.child_school,
      getText(formData, 'child_soccer_experience'),
      payload.guardian_name,
      payload.guardian_email,
      payload.guardian_phone,
      getText(formData, 'guardian_address'),
      payload.emergency_name,
      payload.emergency_relation,
      payload.emergency_phone,
      getText(formData, 'emergency_email'),
      getText(formData, 'emergency_address'),
      payload.uniform_top_size,
      payload.uniform_short_size,
      getText(formData, 'preferred_numbers'),
      payload.payment_plan,
      payload.payment_method,
      payload.parent_signature,
      JSON.stringify(consents),
    ]

    const client = await pool.connect()
    let registrationId: number

    try {
      await client.query('begin')
      const result = await client.query(insertQuery, values)
      registrationId = result.rows[0]?.id as number

      const uploadDir = process.env.UPLOAD_DIR || 'public/uploads'
      await mkdir(uploadDir, { recursive: true })

      for (const docKey of DOCUMENT_FIELDS) {
        const fileValue = formData.get(docKey)
        const info = getFileInfo(fileValue)
        if (!info || !fileValue || typeof fileValue === 'string') continue
        const file = fileValue as File
        const buffer = Buffer.from(await file.arrayBuffer())
        const safeName = sanitizeFilename(info.filename)
        const ext = path.extname(safeName)
        const base = ext ? safeName.slice(0, -ext.length) : safeName
        const uniqueName = `${registrationId}-${docKey}-${Date.now()}-${base}${ext}`
        const filePath = path.join(uploadDir, uniqueName)
        await writeFile(filePath, buffer)

        const publicPath = uploadDir.startsWith('public')
          ? path.posix.join(
              uploadDir.replace(/^public[\\/]/, '').replace(/\\/g, '/'),
              uniqueName
            )
          : filePath.replace(/\\/g, '/')

        await client.query(
          `
            insert into player_registration_documents
              (registration_id, doc_key, filename, content_type, size_bytes, path)
            values
              ($1, $2, $3, $4, $5, $6)
          `,
          [registrationId, docKey, info.filename, info.type, info.size, publicPath]
        )
      }
        await client.query(
          `
            insert into site_messages
              (type, name, email, phone, message, payload)
            values
              ($1, $2, $3, $4, $5, $6)
          `,
          [
            'joueur',
            `${payload.guardian_name} (Enfant: ${payload.child_first_name} ${payload.child_last_name})`,
            payload.guardian_email,
            payload.guardian_phone,
            `Nouvelle inscription Joueur confirmée pour le programme ${payload.program}.`,
            JSON.stringify(payload),
          ]
        )

      await client.query('commit')
    } catch (dbError) {
      await client.query('rollback')
      throw dbError
    } finally {
      client.release()
    }

    await sendRegistrationEmail({
      to: payload.guardian_email,
      guardianName: payload.guardian_name,
      program: payload.program,
    })

    return NextResponse.json({
      message:
        "Inscription enregistree. Merci de verifier votre boite email pour confirmer l'inscription.",
      id: registrationId,
    })
  } catch (error) {
    console.error('Erreur inscription joueur:', error)
    return NextResponse.json(
      { error: "Impossible d'enregistrer l'inscription pour le moment." },
      { status: 500 }
    )
  }
}
