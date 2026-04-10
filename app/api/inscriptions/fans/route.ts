import { NextResponse } from 'next/server'
import { ensureFansTable, pool } from '@/lib/db'
import { sendFanRegistrationEmail } from '@/lib/email'

export const runtime = 'nodejs'

const REQUIRED_FIELDS = [
  'first_name',
  'last_name',
  'phone',
  'email',
  'department',
  'address',
  'consent_contact',
] as const

function getText(formData: FormData, key: string) {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const payload = Object.fromEntries(
      REQUIRED_FIELDS.map((key) => [key, getText(formData, key)])
    ) as Record<string, string>

    const missingFields = REQUIRED_FIELDS.filter((key) => !payload[key])
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: 'Veuillez remplir tous les champs obligatoires.',
        },
        { status: 400 }
      )
    }

    if (payload.consent_contact !== 'yes') {
      return NextResponse.json(
        {
          error: "Veuillez accepter l'autorisation de contact.",
        },
        { status: 400 }
      )
    }

    await ensureFansTable()

    const result = await pool.query(
      `
        insert into fan_registrations
          (first_name, last_name, phone, email, department, address, consent_contact)
        values
          ($1, $2, $3, $4, $5, $6, $7)
        returning id
      `,
      [
        payload.first_name,
        payload.last_name,
        payload.phone,
        payload.email,
        payload.department,
        payload.address,
        true,
      ]
    )

    const registrationId = result.rows[0]?.id as number

    await sendFanRegistrationEmail({
      to: payload.email,
      name: `${payload.first_name} ${payload.last_name}`.trim(),
      registrationId,
    })

    return NextResponse.json({
      message:
        "Vous avez rejoint la communaute. Merci de verifier votre boite email.",
      id: registrationId,
    })
  } catch (error) {
    console.error('Erreur inscription fan:', error)
    return NextResponse.json(
      { error: "Impossible d'enregistrer l'inscription pour le moment." },
      { status: 500 }
    )
  }
}
