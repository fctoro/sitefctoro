import { existsSync } from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

type RegistrationEmailInput = {
  to: string
  guardianName: string
  program: string
}

type FanEmailInput = {
  to: string
  name: string
}

type EmailStat = {
  label: string
  value: string
}

type EmailTemplateInput = {
  preheader: string
  eyebrow: string
  title: string
  intro: string
  highlight: string
  details: string[]
  stats?: EmailStat[]
  ctaLabel?: string
  ctaHref?: string
  footerNote: string
  theme?: EmailTheme
}

type EmailTheme = {
  pageBackground: string
  shellBackground: string
  cardBackground: string
  cardBorder: string
  cardShadow: string
  badgeBackground: string
  badgeBorder: string
  badgeText: string
  titleText: string
  introText: string
  highlightBackground: string
  highlightText: string
  detailText: string
  divider: string
  footerText: string
  brandText: string
  buttonBackground: string
  buttonBorder: string
  buttonText: string
  statBackground: string
  statBorder: string
  statLabel: string
  statValue: string
  logoWrapperBackground?: string
  logoWrapperBorder?: string
  logoWrapperText: string
}

type SocialLink = {
  href: string
  label: string
  iconPath: string
  iconCid: string
  iconFilename: string
}

const smtpHost = process.env.SMTP_HOST
const smtpPort = process.env.SMTP_PORT
const smtpSecure = process.env.SMTP_SECURE === 'true'
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const smtpFrom = process.env.SMTP_FROM
const smtpFromName = process.env.SMTP_FROM_NAME || 'FC TORO'

const frontendUrl = (process.env.FRONTEND_URL || process.env.BASE_URL || '').replace(/\/$/, '')
const logoCid = 'fc-toro-logo'
const logoPath = path.join(process.cwd(), 'public', 'fc-toro-logo.png')
const hasInlineLogo = existsSync(logoPath)
const fanSocialLinks: SocialLink[] = [
  {
    href: 'https://www.instagram.com/fctoro/',
    label: 'Instagram',
    iconPath: path.join(process.cwd(), 'public', 'email-instagram.png'),
    iconCid: 'social-instagram',
    iconFilename: 'instagram.png',
  },
  {
    href: 'https://www.facebook.com/fctoro?locale=fr_FR',
    label: 'Facebook',
    iconPath: path.join(process.cwd(), 'public', 'email-facebook.png'),
    iconCid: 'social-facebook',
    iconFilename: 'facebook.png',
  },
  {
    href: 'https://www.tiktok.com/@fctoroayiti',
    label: 'TikTok',
    iconPath: path.join(process.cwd(), 'public', 'email-tiktok.png'),
    iconCid: 'social-tiktok',
    iconFilename: 'tiktok.png',
  },
  {
    href: 'https://www.youtube.com/@fctorohaiti2023',
    label: 'YouTube',
    iconPath: path.join(process.cwd(), 'public', 'email-youtube.png'),
    iconCid: 'social-youtube',
    iconFilename: 'youtube.png',
  },
]

const clubTheme: EmailTheme = {
  pageBackground: '#edf3ff',
  shellBackground:
    'background-color:#edf3ff;background-image:linear-gradient(180deg,#07142d 0%,#0b2048 28%,#edf3ff 28%,#edf3ff 100%);',
  cardBackground: '#ffffff',
  cardBorder: '#ffffff',
  cardShadow: '0 30px 80px rgba(7,20,45,0.18)',
  badgeBackground: 'rgba(255,255,255,0.12)',
  badgeBorder: 'rgba(255,255,255,0.15)',
  badgeText: '#f7fbff',
  titleText: '#ffffff',
  introText: '#20314f',
  highlightBackground:
    'background-color:#0b2048;background-image:linear-gradient(135deg,#07142d 0%,#12336d 100%);',
  highlightText: '#ffffff',
  detailText: '#40526f',
  divider: '#e4ebf7',
  footerText: '#667896',
  brandText: '#0d2a5e',
  buttonBackground: '#ef233c',
  buttonBorder: '#ef233c',
  buttonText: '#ffffff',
  statBackground: '#ffffff',
  statBorder: '#dbe7ff',
  statLabel: '#5776b3',
  statValue: '#081a38',
  logoWrapperText: '#ffffff',
}

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

function getAbsoluteUrl(pathname: string) {
  if (!frontendUrl) return ''
  return `${frontendUrl}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
}

function getLogoAttachment() {
  if (!hasInlineLogo) return []

  return [
    {
      filename: 'fc-toro-logo.png',
      path: logoPath,
      cid: logoCid,
    },
  ]
}

function getFanSocialAttachments() {
  return fanSocialLinks
    .filter((link) => existsSync(link.iconPath))
    .map((link) => ({
      filename: link.iconFilename,
      cid: link.iconCid,
      path: link.iconPath,
    }))
}

function getLogoSrc() {
  if (hasInlineLogo) return `cid:${logoCid}`
  if (frontendUrl) return `${frontendUrl}/fc-toro-logo.png`
  return ''
}

function renderSocialButtons(links: SocialLink[]) {
  return links
    .map((link) => {
      const iconMarkup = existsSync(link.iconPath)
        ? `<img src="cid:${escapeHtml(link.iconCid)}" alt="${escapeHtml(link.label)}" width="28" height="28" style="display:inline-block;vertical-align:middle;width:28px;height:28px;border:0;outline:none;text-decoration:none;" />`
        : `<span style="display:inline-block;vertical-align:middle;font-size:16px;line-height:28px;font-weight:900;color:#ffffff;">${escapeHtml(link.label.slice(0, 2).toUpperCase())}</span>`

      return `
        <td style="padding:0 10px;">
          <a
            href="${escapeHtml(link.href)}"
            aria-label="${escapeHtml(link.label)}"
            style="display:inline-block;width:60px;height:60px;line-height:60px;text-align:center;border-radius:12px;background:#ef233c;border:2px solid #ef233c;text-decoration:none;"
            class="social-btn"
          >
            ${iconMarkup}
          </a>
        </td>
      `
    })
    .join('')
}

function renderCompactFanEmail({
  name,
  primaryUrl,
}: {
  name: string
  primaryUrl: string
}) {
  const logoSrc = getLogoSrc()
  const safeName = escapeHtml(name)
  const logoMarkup = logoSrc
    ? `<img src="${escapeHtml(logoSrc)}" alt="FC TORO" width="100" style="display:inline-block;width:100px;max-width:100px;height:auto;" />`
    : '<div style="font-size:26px;line-height:1;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:#ef233c;">FC TORO</div>'
  const socialButtons = renderSocialButtons(fanSocialLinks)

  return `
    <!DOCTYPE html>
    <html lang="fr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap');
          
          :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
          }

          @media (prefers-color-scheme: dark) {
            .body-bg { background-color: #030712 !important; }
            .content-table { background-color: #030712 !important; }
            .title { color: #ffffff !important; }
            .subtitle { color: #94a3b8 !important; }
            .card-accent { background-color: #0f172a !important; border-color: #1e293b !important; }
            .social-btn { background-color: #1e293b !important; border-color: #334155 !important; }
          }

          [data-ogsc] .body-bg { background-color: #030712 !important; }
        </style>
        <title>Bienvenue chez les fans FC TORO</title>
      </head>
      <body style="margin:0;padding:0;background:#0a1224;font-family:'Poppins',Arial,sans-serif;color:#ffffff;" class="body-bg">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
          Bonjour ${safeName}, Bienvenue au sein de la famille FC TORO. Votre accès membre exclusif.
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#0a1224" class="body-bg" style="min-height:100vh;">
          <tr>
            <td align="center" style="padding:40px 16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;text-align:left;" class="content-table">
                <!-- Header: Asymmetrical -->
                <tr>
                  <td style="padding-bottom:60px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td align="left" style="width:120px;">
                           ${logoMarkup}
                        </td>
                        <td align="right" valign="top">
                          <div style="height:4px;width:80px;background:#ef233c;margin-bottom:12px;"></div>
                          <div style="font-size:11px;font-weight:900;letter-spacing:0.3em;text-transform:uppercase;color:#64748b;">MACHE SOU YO</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Content: Editorial Bold -->
                <tr>
                  <td style="padding:0 0 20px 0;">
                    <div style="font-size:13px;font-weight:900;letter-spacing:0.25em;text-transform:uppercase;color:#ef233c;margin-bottom:4px;">
                      Bienvenue
                    </div>
                    <h1 style="margin:0;font-size:42px;line-height:1.05;font-weight:900;color:#ffffff;letter-spacing:-0.04em;" class="title">
                      AUX FANS<br/>FC TORO.
                    </h1>
                    <div style="margin:16px 0 0 0;height:2px;width:100%;background:#1e293b;"></div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 0 60px 0;">
                    <p style="margin:0;font-size:18px;line-height:1.7;color:#cbd5e1;font-weight:400;" class="subtitle">
                      Bonjour <strong>${safeName}</strong>, nous sommes ravis de vous compter parmi nos plus fervents supporters. <br/><br/>
                      Votre passion porte nos couleurs plus haut. Vivez l'actualité du club avec un accès privilégié aux moments qui font l'histoire de FC TORO.
                    </p>
                    
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top:40px;">
                      <tr>
                        <td align="left">
                          <a
                            href="${escapeHtml(primaryUrl)}"
                            style="display:inline-block;padding:20px 48px;background:#ef233c;color:#ffffff;text-decoration:none;font-size:14px;font-weight:900;letter-spacing:0.15em;text-transform:uppercase;border-radius:4px;"
                          >
                            Accès Membre
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Highlights Box -->
                <tr>
                  <td style="padding:40px 30px;background:#0f172a;border-radius:12px;text-align:center;" class="card-accent">
                    <h2 style="margin:0;font-size:20px;font-weight:800;color:#ffffff;" class="title">Suivez l'aventure</h2>
                    <p style="margin-top:12px;font-size:15px;line-height:1.8;color:#94a3b8;" class="subtitle">
                      Pourquoi rejoindre notre communauté ? <br/>Pour vivre l'immersion totale, les coulisses exclusives et l'énergie pure de FC TORO en temps réel.
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:34px auto 0 auto;">
                      <tr>
                        ${socialButtons}
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Signature Footer -->
                <tr>
                  <td style="padding-top:80px;border-top:1px solid #1e293b;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td valign="bottom" align="left">
                          <div style="font-size:12px;font-weight:900;letter-spacing:0.2em;color:#ffffff;margin-bottom:6px;" class="title">FC TORO | MACHE SOU YO</div>
                          <div style="font-size:11px;color:#64748b;" class="text-muted">7 Rue Rigaud, Petion-Ville, Haïti</div>
                        </td>
                        <td valign="bottom" align="right">
                           <div style="font-size:11px;color:#ffffff;" class="text-muted">© 2026 Football Club TORO.</div>
                        </td>
                      </tr>
                    </table>
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

function renderStat(stat: EmailStat, theme: EmailTheme) {
  return `
    <td style="padding:0 6px 12px 6px;" valign="top">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${theme.statBackground}" style="border-collapse:separate;border-spacing:0;background:${theme.statBackground};border:1px solid ${theme.statBorder};border-radius:18px;">
        <tr>
          <td style="padding:16px 16px 14px 16px;">
            <div style="font-size:11px;line-height:1.4;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${theme.statLabel};">${escapeHtml(stat.label)}</div>
            <div style="margin-top:8px;font-size:16px;line-height:1.4;font-weight:800;color:${theme.statValue};">${escapeHtml(stat.value)}</div>
          </td>
        </tr>
      </table>
    </td>
  `
}

function renderEmailTemplate({
  preheader,
  eyebrow,
  title,
  intro,
  highlight,
  details,
  stats = [],
  ctaLabel,
  ctaHref,
  footerNote,
  theme = clubTheme,
}: EmailTemplateInput) {
  const logoSrc = getLogoSrc()
  const safePreheader = escapeHtml(preheader)
  const safeEyebrow = escapeHtml(eyebrow)
  const safeTitle = escapeHtml(title)
  const safeIntro = escapeHtml(intro)
  const safeHighlight = escapeHtml(highlight)
  const rawLogoHtml = logoSrc
    ? `<img src="${escapeHtml(logoSrc)}" alt="FC TORO" width="108" style="display:inline-block;width:108px;max-width:108px;height:auto;" />`
    : `<div style="display:inline-block;font-size:20px;line-height:1;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:${theme.logoWrapperText};">FC TORO</div>`
  const logoHtml =
    theme.logoWrapperBackground || theme.logoWrapperBorder
      ? `<div style="display:inline-block;padding:14px 18px;border-radius:24px;background:${theme.logoWrapperBackground || 'transparent'};border:1px solid ${theme.logoWrapperBorder || 'transparent'};">${rawLogoHtml}</div>`
      : rawLogoHtml
  const detailHtml = details
    .map(
      (detail) => `
        <tr>
          <td style="padding:0 0 12px 0;font-size:15px;line-height:1.75;color:${theme.detailText};">
            ${escapeHtml(detail)}
          </td>
        </tr>
      `
    )
    .join('')
  const statsHtml =
    stats.length > 0
      ? `
        <tr>
          <td style="padding:0 32px 28px 32px;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                ${stats.map((stat) => renderStat(stat, theme)).join('')}
              </tr>
            </table>
          </td>
        </tr>
      `
      : ''
  const ctaHtml =
    ctaLabel && ctaHref
      ? `
        <tr>
          <td style="padding:0 32px 28px 32px;">
            <a href="${escapeHtml(ctaHref)}" style="display:inline-block;background:${theme.buttonBackground};border:1px solid ${theme.buttonBorder};color:${theme.buttonText};text-decoration:none;font-size:14px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;padding:15px 24px;border-radius:999px;">
              ${escapeHtml(ctaLabel)}
            </a>
          </td>
        </tr>
      `
      : ''

  return `
    <!DOCTYPE html>
    <html lang="fr">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <title>${safeTitle}</title>
      </head>
      <body style="margin:0;padding:0;background:${theme.pageBackground};font-family:Arial,sans-serif;color-scheme:light;supported-color-schemes:light;">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
          ${safePreheader}
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${theme.pageBackground}" style="${theme.shellBackground}padding:32px 12px;">
          <tr>
            <td align="center">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:680px;border-collapse:separate;border-spacing:0;">
                <tr>
                  <td style="padding:0 0 18px 0;text-align:center;">
                    ${logoHtml}
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 0 18px 0;text-align:center;">
                    <div style="display:inline-block;padding:8px 14px;border-radius:999px;background:${theme.badgeBackground};border:1px solid ${theme.badgeBorder};font-size:11px;line-height:1.2;font-weight:800;letter-spacing:0.18em;text-transform:uppercase;color:${theme.badgeText};">
                      ${safeEyebrow}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 18px 26px 18px;text-align:center;">
                    <div style="font-size:36px;line-height:1.12;font-weight:900;color:${theme.titleText};">
                      ${safeTitle}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${theme.cardBackground}" style="background:${theme.cardBackground};border:1px solid ${theme.cardBorder};border-radius:30px;overflow:hidden;box-shadow:${theme.cardShadow};">
                      <tr>
                        <td style="padding:34px 32px 18px 32px;">
                          <div style="font-size:17px;line-height:1.8;color:${theme.introText};">
                            ${safeIntro}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 32px 24px 32px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="${theme.highlightBackground}" style="${theme.highlightBackground}border-radius:24px;">
                            <tr>
                              <td style="padding:22px 24px;font-size:18px;line-height:1.65;font-weight:700;color:${theme.highlightText};">
                                ${safeHighlight}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 32px 16px 32px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            ${detailHtml}
                          </table>
                        </td>
                      </tr>
                      ${statsHtml}
                      ${ctaHtml}
                      <tr>
                        <td style="padding:0 32px 16px 32px;">
                          <div style="height:1px;background:${theme.divider};"></div>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 32px 34px 32px;">
                          <div style="font-size:13px;line-height:1.7;color:${theme.footerText};">
                            ${escapeHtml(footerNote)}
                          </div>
                          <div style="margin-top:18px;font-size:12px;line-height:1.7;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${theme.brandText};">
                            FC TORO
                          </div>
                        </td>
                      </tr>
                    </table>
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

export async function sendRegistrationEmail({
  to,
  guardianName,
  program,
}: RegistrationEmailInput) {
  const transporter = getTransporter()
  if (!transporter) return

  const safeName = guardianName || 'Parent'
  const programLabel = program === 'tiToro' ? 'Ti Toro' : 'FC TORO'
  const registrationPageUrl = getAbsoluteUrl('/inscription/joueur')
  const subject = 'Confirmation de votre inscription FC TORO'

  const text = [
    `Bonjour ${safeName},`,
    '',
    'Votre demande d inscription a bien ete recue par FC TORO.',
    `Programme concerne: ${programLabel}.`,
    'Notre equipe vous contactera avec les prochaines instructions pour finaliser le paiement et la suite du parcours.',
    registrationPageUrl ? `Retrouvez le parcours ici: ${registrationPageUrl}` : '',
    '',
    'Merci de votre confiance,',
    'FC TORO',
  ]
    .filter(Boolean)
    .join('\n')

  const html = renderEmailTemplate({
    preheader: 'Votre inscription FC TORO a bien ete recue.',
    eyebrow: 'Confirmation inscription',
    title: 'Votre inscription est bien en route.',
    intro: `Bonjour ${safeName}, votre demande d inscription a bien ete recue par FC TORO.`,
    highlight:
      'Le club prepare maintenant les prochaines etapes pour accompagner votre famille dans une integration claire, serieuse et sportive.',
    details: [
      `Programme concerne: ${programLabel}.`,
      'Vous recevrez bientot les informations utiles pour finaliser le paiement et valider la suite du dossier.',
      'Notre equipe reste mobilisee pour vous guider simplement, du formulaire jusqu au terrain.',
    ],
    stats: [
      { label: 'Programme', value: programLabel },
      { label: 'Suivi', value: 'Paiement et validation a venir' },
      { label: 'Equipe', value: 'FC TORO Academy' },
    ],
    ctaLabel: registrationPageUrl ? 'Voir le parcours' : undefined,
    ctaHref: registrationPageUrl || undefined,
    footerNote:
      'Cet email confirme uniquement la bonne reception de votre demande. Les prochaines instructions vous seront transmises par le club.',
  })

  await transporter.sendMail({
    from: `${smtpFromName} <${smtpFrom}>`,
    to,
    subject,
    text,
    html,
    attachments: [...getLogoAttachment(), ...getFanSocialAttachments()],
  })
}

export async function sendFanRegistrationEmail({ to, name }: FanEmailInput) {
  const transporter = getTransporter()
  if (!transporter) return

  const safeName = name || 'Supporter'
  const primaryFollowUrl = frontendUrl || fanSocialLinks[0]?.href || 'https://www.instagram.com/fctoro/'
  const subject = 'Bienvenue chez les fans FC TORO'

  const text = [
    `Bonjour ${safeName},`,
    '',
    'Bienvenue chez les fans FC TORO.',
    'Suis le club et retrouve les moments forts sur nos reseaux.',
    `Suivre FC TORO: ${primaryFollowUrl}`,
    'Instagram: https://www.instagram.com/fctoro/',
    'Facebook: https://www.facebook.com/fctoro?locale=fr_FR',
    'TikTok: https://www.tiktok.com/@fctoroayiti',
    'YouTube: https://www.youtube.com/@fctorohaiti2023',
    '',
    'A tres vite autour du terrain,',
    'FC TORO',
  ]
    .filter(Boolean)
    .join('\n')

  const html = renderCompactFanEmail({
    name: safeName,
    primaryUrl: primaryFollowUrl,
  })

  await transporter.sendMail({
    from: `${smtpFromName} <${smtpFrom}>`,
    to,
    subject,
    text,
    html,
    attachments: [...getLogoAttachment(), ...getFanSocialAttachments()],
  })
}
