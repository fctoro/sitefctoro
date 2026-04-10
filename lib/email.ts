import nodemailer from 'nodemailer'

type RegistrationEmailInput = {
  to: string
  guardianName: string
  program: string
  registrationId: number
}

type FanEmailInput = {
  to: string
  name: string
  registrationId: number
}

const smtpHost = process.env.SMTP_HOST
const smtpPort = process.env.SMTP_PORT
const smtpSecure = process.env.SMTP_SECURE === 'true'
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const smtpFrom = process.env.SMTP_FROM
const smtpFromName = process.env.SMTP_FROM_NAME || 'FC TORO'

const frontendUrl = process.env.FRONTEND_URL || process.env.BASE_URL || ''

function getTransporter() {
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !smtpFrom) {
    return null
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  })
}

export async function sendRegistrationEmail({
  to,
  guardianName,
  program,
  registrationId,
}: RegistrationEmailInput) {
  const transporter = getTransporter()
  if (!transporter) return

  const safeName = guardianName || 'Parent'
  const linkPart = frontendUrl ? `Vous pouvez consulter la page d'inscription ici : ${frontendUrl}/inscription/joueur` : ''

  const subject = 'Confirmation de votre inscription FC TORO'

  const text = [
    `Bonjour ${safeName},`,
    '',
    'Votre inscription a bien ete recue.',
    `Numero de dossier: ${registrationId}`,
    `Programme: ${program === 'tiToro' ? 'Ti Toro' : 'FC Toro'}`,
    '',
    "Vous recevrez prochainement les instructions finales pour le paiement.",
    linkPart,
    '',
    'Merci,',
    'FC TORO',
  ]
    .filter(Boolean)
    .join('\n')

  const html = `
    <div style="font-family:Arial, sans-serif; line-height:1.6; color:#0a1d3a;">
      <p>Bonjour ${safeName},</p>
      <p>Votre inscription a bien ete recue.</p>
      <p><strong>Numero de dossier:</strong> ${registrationId}<br />
      <strong>Programme:</strong> ${program === 'tiToro' ? 'Ti Toro' : 'FC Toro'}</p>
      <p>Vous recevrez prochainement les instructions finales pour le paiement.</p>
      ${linkPart ? `<p>${linkPart}</p>` : ''}
      <p>Merci,<br />FC TORO</p>
    </div>
  `

  await transporter.sendMail({
    from: `${smtpFromName} <${smtpFrom}>`,
    to,
    subject,
    text,
    html,
  })
}

export async function sendFanRegistrationEmail({
  to,
  name,
  registrationId,
}: FanEmailInput) {
  const transporter = getTransporter()
  if (!transporter) return

  const safeName = name || 'Supporter'
  const linkPart = frontendUrl ? `Vous pouvez consulter la page fans ici : ${frontendUrl}/inscription/fans` : ''

  const subject = 'Confirmation de votre demande de rejoindre la communauté du FC TORO'

  const text = [
    `Bonjour ${safeName},`,
    '',
    'Votre demande de Rejoindre la communauté a bien été recue.',
    `Numero de dossier: ${registrationId}`,
    '',
    'Merci de vérifier votre boite email pour confirmer votre inscription.',
    linkPart,
    '',
    'Merci,',
    'FC TORO',
  ]
    .filter(Boolean)
    .join('\n')

  const html = `
    <div style="font-family:Arial, sans-serif; line-height:1.6; color:#0a1d3a;">
      <p>Bonjour ${safeName},</p>
      <p>Votre inscription en tant que supporter a bien ete recue.</p>
      <p><strong>Numero de dossier:</strong> ${registrationId}</p>
      <p>Merci de verifier votre boite email pour confirmer votre inscription.</p>
      ${linkPart ? `<p>${linkPart}</p>` : ''}
      <p>Merci,<br />FC TORO</p>
    </div>
  `

  await transporter.sendMail({
    from: `${smtpFromName} <${smtpFrom}>`,
    to,
    subject,
    text,
    html,
  })
}
