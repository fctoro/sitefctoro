import { existsSync } from 'fs'
import nodemailer from 'nodemailer'
import { fileURLToPath } from 'url'

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

import path from 'path'

const frontendUrl = (process.env.FRONTEND_URL || process.env.BASE_URL || 'https://fctoro.com').replace(/\/$/, '')
const logoCid = 'fc-toro-logo'
const logoPath = path.join(process.cwd(), 'public', 'fc-toro-logo.png')
const instagramIconPath = path.join(process.cwd(), 'public', 'email-instagram.png')
const facebookIconPath = path.join(process.cwd(), 'public', 'email-facebook.png')
const tiktokIconPath = path.join(process.cwd(), 'public', 'email-tiktok.png')
const youtubeIconPath = path.join(process.cwd(), 'public', 'email-youtube.png')
const hasInlineLogo = existsSync(logoPath)
const fanSocialLinks: SocialLink[] = [
  {
    href: 'https://www.instagram.com/fctoro/',
    label: 'Instagram',
    iconPath: instagramIconPath,
    iconCid: 'social-instagram',
    iconFilename: 'instagram.png',
  },
  {
    href: 'https://www.facebook.com/fctoro?locale=fr_FR',
    label: 'Facebook',
    iconPath: facebookIconPath,
    iconCid: 'social-facebook',
    iconFilename: 'facebook.png',
  },
  {
    href: 'https://www.tiktok.com/@fctoroayiti',
    label: 'TikTok',
    iconPath: tiktokIconPath,
    iconCid: 'social-tiktok',
    iconFilename: 'tiktok.png',
  },
  {
    href: 'https://www.youtube.com/@fctorohaiti2023',
    label: 'YouTube',
    iconPath: youtubeIconPath,
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
        ? `<img src="cid:${escapeHtml(link.iconCid)}" alt="${escapeHtml(link.label)}" width="18" height="18" style="display:inline-block;vertical-align:middle;width:18px;height:18px;border:0;outline:none;text-decoration:none;" />`
        : `<span style="display:inline-block;vertical-align:middle;font-size:12px;line-height:18px;font-weight:900;color:#ffffff;">${escapeHtml(link.label.slice(0, 2).toUpperCase())}</span>`

      return `
        <td style="padding:0 6px;">
          <a
            href="${escapeHtml(link.href)}"
            aria-label="${escapeHtml(link.label)}"
            style="display:inline-block;width:42px;height:42px;line-height:42px;text-align:center;border-radius:10px;background:#ef233c;border:1px solid #ef233c;text-decoration:none;"
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
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#0a1224" class="body-bg" style="width:100%;background:#0a1224;">
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
                  <td style="padding:32px 24px;background:#0f172a;border-radius:12px;text-align:center;" class="card-accent">
                    <h2 style="margin:0;font-size:18px;font-weight:800;color:#ffffff;" class="title">Suivez l'aventure</h2>
                    <p style="margin-top:10px;font-size:14px;line-height:1.7;color:#94a3b8;" class="subtitle">
                      Pourquoi rejoindre notre communauté ? <br/>Pour vivre l'immersion totale, les coulisses exclusives et l'énergie pure de FC TORO en temps réel.
                    </p>
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:24px auto 0 auto;">
                      <tr>
                        ${socialButtons}
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Signature Footer -->
                <tr>
                  <td style="padding-top:52px;border-top:1px solid #1e293b;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td valign="bottom" align="left">
                          <div style="font-size:10px;font-weight:900;letter-spacing:0.16em;color:#ffffff;margin-bottom:4px;" class="title">FC TORO | MACHE SOU YO</div>
                          <div style="font-size:10px;color:#64748b;" class="text-muted">7 Rue Rigaud, Petion-Ville, Haïti</div>
                        </td>
                        <td valign="bottom" align="right">
                           <div style="font-size:10px;color:#ffffff;" class="text-muted">© 2026 Football Club TORO.</div>
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
  socialButtonsHtml,
  navHtml,
}: EmailTemplateInput & { socialButtonsHtml?: string; navHtml?: string }) {
  const logoSrc = getLogoSrc()
  const safePreheader = escapeHtml(preheader)
  const safeEyebrow = escapeHtml(eyebrow)
  const safeTitle = escapeHtml(title)
  const safeIntro = escapeHtml(intro)
  const safeHighlight = escapeHtml(highlight)

  const logoMarkup = logoSrc
    ? `<img src="${escapeHtml(logoSrc)}" alt="FC TORO" width="100" style="display:inline-block;width:100px;max-width:100px;height:auto;" />`
    : '<div style="font-size:26px;line-height:1;font-weight:900;letter-spacing:0.18em;text-transform:uppercase;color:#ef233c;">FC TORO</div>'

  const detailHtml = details
    .map(
      (detail) => `
        <tr>
          <td align="left" style="padding:0 0 16px 0;font-size:16px;line-height:1.75;color:#cbd5e1;">
            • ${escapeHtml(detail)}
          </td>
        </tr>
      `
    )
    .join('')

  const statsHtml =
    stats.length > 0
      ? `
        <tr>
          <td style="padding:40px 0 20px 0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
              <tr>
                ${stats
                  .map(
                    (stat) => `
                  <td style="padding:0 24px 12px 0;" valign="top" align="left">
                    <div style="font-size:11px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;color:#ef233c;margin-bottom:6px;">${escapeHtml(stat.label)}</div>
                    <div style="font-size:16px;font-weight:800;color:#ffffff;">${escapeHtml(stat.value)}</div>
                  </td>
                `
                  )
                  .join('')}
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
          <td style="padding-top:40px;" align="left">
            <a href="${escapeHtml(ctaHref)}" style="display:inline-block;padding:20px 48px;background:#ef233c;color:#ffffff;text-decoration:none;font-size:14px;font-weight:900;letter-spacing:0.15em;text-transform:uppercase;border-radius:4px;">
              ${escapeHtml(ctaLabel)}
            </a>
          </td>
        </tr>
      `
      : ''

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
            .text-muted { color: #64748b !important; }
          }

          @media screen and (max-width: 480px) {
            .event-btn { display: block !important; width: 100% !important; margin: 10px 0 !important; }
          }
           [data-ogsc] .body-bg { background-color: #030712 !important; }
        </style>
        <title>${safeTitle}</title>
      </head>
      <body style="margin:0;padding:0;background:#0a1224;font-family:'Poppins',Arial,sans-serif;color:#ffffff;" class="body-bg">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
          ${safePreheader}
        </div>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#0a1224" class="body-bg" style="width:100%;background:#0a1224;">
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

                <!-- Content Layer -->
                <tr>
                  <td style="padding:0 0 20px 0;text-align:left;">
                    <div style="font-size:13px;font-weight:900;letter-spacing:0.25em;text-transform:uppercase;color:#ef233c;margin-bottom:4px;">
                      ${safeEyebrow}
                    </div>
                    <h1 style="margin:0;font-size:42px;line-height:1.05;font-weight:900;color:#ffffff;letter-spacing:-0.04em;" class="title">
                      ${safeTitle.toUpperCase()}
                    </h1>
                    <div style="margin:16px 0 0 0;height:2px;width:80px;background:#1e293b;"></div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:20px 0 40px 0;text-align:left;">
                    <p style="margin:0;font-size:18px;line-height:1.7;color:#cbd5e1;font-weight:400;" class="subtitle">
                      ${safeIntro}
                    </p>
                    
                    <div style="margin:30px 0 0 0;font-size:18px;line-height:1.6;font-weight:700;color:#ffffff;max-width:560px;">
                      ${safeHighlight}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 0 40px 0;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      ${detailHtml}
                    </table>
                  </td>
                </tr>

                ${navHtml ? `<tr><td style="padding:32px 0 0 0;">${navHtml}</td></tr>` : ''}

                ${statsHtml}

                ${socialButtonsHtml ? `<tr><td style="padding:24px 0 24px 0;">${socialButtonsHtml}</td></tr>` : ''}

                <!-- Signature Footer -->
                <tr>
                  <td style="padding-top:32px;border-top:1px solid #1e293b;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td colspan="2" align="center" style="padding-bottom:14px;font-size:12px;line-height:1.6;color:#94a3b8;">
                          ${escapeHtml(footerNote)}
                        </td>
                      </tr>
                      <tr>
                        <td valign="bottom" align="left">
                          <div style="font-size:10px;font-weight:900;letter-spacing:0.16em;color:#ffffff;margin-bottom:4px;">FC TORO | MACHE SOU YO</div>
                          <div style="font-size:10px;color:#64748b;">7 Rue Rigaud, Petion-Ville, Haïti</div>
                        </td>
                        <td valign="bottom" align="right">
                           <div style="font-size:10px;color:#ffffff;">© 2026 Football Club TORO.</div>
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

  const socialButtonsHtml = `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="text-align:center;">
      <tr>
        <td align="center">
          <h3 style="margin:0 0 16px 0;font-size:20px;font-weight:900;color:#ffffff;">Suivez l'aventure</h3>
          <p style="margin:0 0 24px 0;font-size:14px;line-height:1.7;color:#94a3b8;">
            Pourquoi rejoindre notre communauté ? <br/>Pour vivre l'immersion totale et l'énergie pure de FC TORO.
          </p>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
            <tr>
              ${renderSocialButtons(fanSocialLinks)}
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `

  const eventLinks = [
    { name: 'Vertières Cup', url: '/evenements/vertieres-cup' },
    { name: 'Flag Day', url: '/evenements/flag-day' },
    { name: 'Intrasquad', url: '/evenements/intrasquad' },
    { name: 'International', url: '/evenements/tournoi-international' },
  ]

  const programLinks = [
    { name: 'Élite', url: '/elite' },
    { name: 'Casa', url: '/casa' },
    { name: 'Ti Toro', url: '/ti-toro' },
  ]

  const navHtml = `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
      <tr>
        <!-- Column 1: Programmes -->
        <td width="50%" valign="top" align="left">
          <div style="font-size:11px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;color:#ef233c;margin-bottom:15px;">Programmes</div>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            ${programLinks
              .map(
                (pr) => `
              <tr>
                <td style="padding-bottom:10px;">
                  <a href="${getAbsoluteUrl(pr.url)}" style="font-size:16px;font-weight:800;color:#ffffff;text-decoration:none;letter-spacing:0.02em;">
                    ${pr.name} <span style="color:#ef233c;margin-left:4px;">→</span>
                  </a>
                </td>
              </tr>
            `
              )
              .join('')}
          </table>
        </td>
        <!-- Column 2: Évènements -->
        <td width="50%" valign="top" align="left" style="padding-left:40px;">
          <div style="font-size:11px;font-weight:900;letter-spacing:0.2em;text-transform:uppercase;color:#ef233c;margin-bottom:15px;">Évènements</div>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            ${eventLinks
              .map(
                (ev) => `
              <tr>
                <td style="padding-bottom:10px;">
                  <a href="${getAbsoluteUrl(ev.url)}" style="font-size:16px;font-weight:800;color:#ffffff;text-decoration:none;letter-spacing:0.02em;">
                    ${ev.name} <span style="color:#ef233c;margin-left:4px;">→</span>
                  </a>
                </td>
              </tr>
            `
              )
              .join('')}
          </table>
        </td>
      </tr>
    </table>
  `

  const text = [
    `Bonjour ${safeName},`,
    '',
    "Votre demande d'inscription a bien été reçue par FC TORO.",
    `Programme concerné : FC TORO Elite.`,
    'Notre équipe vous contactera avec les prochaines instructions pour finaliser le paiement et la suite du parcours.',
    registrationPageUrl ? `Retrouvez le parcours ici : ${registrationPageUrl}` : '',
    '',
    'Merci de votre confiance,',
    'FC TORO',
  ]
    .filter(Boolean)
    .join('\n')

  const html = renderEmailTemplate({
    preheader: "Votre inscription FC TORO a bien été reçue par l'équipe.",
    eyebrow: "Confirmation d'inscription",
    title: "Votre inscription est en cours.",
    intro: `Bonjour ${safeName}, votre demande d'inscription a bien été reçue par FC TORO.`,
    highlight:
      "Le club prépare maintenant les prochaines étapes pour accompagner votre famille dans une intégration claire, sérieuse et sportive.",
    details: [
      `Programme concerné : ${programLabel}.`,
      "Vous recevrez bientôt les informations utiles pour finaliser le paiement et valider la suite du dossier.",
      "Notre équipe reste mobilisée pour vous guider simplement, du formulaire jusqu'au terrain.",
    ],
    footerNote:
      "Cet e-mail confirme uniquement la bonne réception de votre demande. Les prochaines instructions vous seront transmises par le club.",
    socialButtonsHtml,
    navHtml,
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
