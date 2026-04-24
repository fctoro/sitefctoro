import 'server-only'

import nodemailer from 'nodemailer'

type FanEmailInput = {
  to: string
  name: string
}

const smtpHost = process.env.SMTP_HOST
const smtpPort = process.env.SMTP_PORT
const smtpSecure = process.env.SMTP_SECURE === 'true'
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const smtpFrom = process.env.SMTP_FROM
const smtpFromName = process.env.SMTP_FROM_NAME || 'FC TORO'
const frontendUrl = (process.env.FRONTEND_URL || process.env.BASE_URL || 'https://fctoro.com').replace(/\/$/, '')

const socialLinks = [
  'https://www.instagram.com/fctoro/',
  'https://www.facebook.com/fctoro?locale=fr_FR',
  'https://www.tiktok.com/@fctoroayiti',
  'https://www.youtube.com/@fctorohaiti2023',
]

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderFanEmail(name: string, primaryFollowUrl: string) {
  const safeName = escapeHtml(name)
  const safeLogoUrl = escapeHtml(`${frontendUrl}/fc-toro-logo.png`)
  const safePrimaryFollowUrl = escapeHtml(primaryFollowUrl)

  return `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bienvenue chez les fans FC TORO</title>
      </head>
      <body style="margin:0;padding:0;background:#0a1224;font-family:Arial,sans-serif;color:#ffffff;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#0a1224;">
          <tr>
            <td align="center" style="padding:32px 16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#081a38;border-radius:24px;overflow:hidden;">
                <tr>
                  <td style="padding:28px 28px 12px 28px;text-align:center;">
                    <img src="${safeLogoUrl}" alt="FC TORO" width="86" style="display:inline-block;width:86px;height:auto;" />
                    <p style="margin:14px 0 0 0;font-size:11px;font-weight:800;letter-spacing:0.24em;text-transform:uppercase;color:#ef233c;">
                      Communaute supporters
                    </p>
                    <h1 style="margin:14px 0 0 0;font-size:34px;line-height:1.05;font-weight:900;text-transform:uppercase;color:#ffffff;">
                      Bienvenue chez les fans FC TORO
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 28px 0 28px;">
                    <p style="margin:0;font-size:17px;line-height:1.75;color:#d9e2f2;">
                      Bonjour <strong>${safeName}</strong>, merci d'avoir rejoint la communaute FC TORO.
                    </p>
                    <p style="margin:16px 0 0 0;font-size:16px;line-height:1.75;color:#d9e2f2;">
                      Retrouvez les annonces du club, les moments forts et les prochaines activations supporters sur nos canaux officiels.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px;text-align:center;">
                    <a href="${safePrimaryFollowUrl}" style="display:inline-block;padding:16px 30px;border-radius:999px;background:#ef233c;color:#ffffff;text-decoration:none;font-size:13px;font-weight:900;letter-spacing:0.14em;text-transform:uppercase;">
                      Suivre FC TORO
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 28px 28px 28px;">
                    <div style="border-radius:18px;background:#10264c;padding:20px;">
                      <p style="margin:0 0 12px 0;font-size:11px;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:#ef233c;">
                        Liens utiles
                      </p>
                      ${socialLinks
                        .map(
                          (href) => `
                            <p style="margin:8px 0 0 0;font-size:14px;line-height:1.6;">
                              <a href="${escapeHtml(href)}" style="color:#ffffff;text-decoration:none;">${escapeHtml(href)}</a>
                            </p>
                          `,
                        )
                        .join('')}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

export async function sendFanRegistrationEmail({ to, name }: FanEmailInput) {
  const transporter = getTransporter()
  if (!transporter) return

  const safeName = name || 'Supporter'
  const primaryFollowUrl = frontendUrl || socialLinks[0]
  const subject = 'Bienvenue chez les fans FC TORO'

  const text = [
    `Bonjour ${safeName},`,
    '',
    'Bienvenue chez les fans FC TORO.',
    'Suis le club et retrouve les moments forts sur nos reseaux.',
    `Suivre FC TORO: ${primaryFollowUrl}`,
    ...socialLinks,
    '',
    'A tres vite autour du terrain,',
    'FC TORO',
  ].join('\n')

  const html = renderFanEmail(safeName, primaryFollowUrl)

  await transporter.sendMail({
    from: `${smtpFromName} <${smtpFrom}>`,
    to,
    subject,
    text,
    html,
  })
}
