function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getInitial(name) {
  const letter = String(name || 'Q').trim().charAt(0).toUpperCase();
  return /[A-Z0-9]/.test(letter) ? letter : 'Q';
}

export function buildContactEmail({
  name,
  email,
  message,
  submittedAt,
  siteName,
  siteUrl,
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
  const safeSiteName = escapeHtml(siteName);
  const safeSiteUrl = escapeHtml(siteUrl);
  const safeDate = escapeHtml(submittedAt);
  const initial = escapeHtml(getInitial(name));
  const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: your inquiry to ${siteName}`)}`;

  const text = [
    `${siteName} — New contact inquiry`,
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Submitted: ${submittedAt}`,
    '',
    'Message:',
    message,
    '',
    'Reply directly to this email to contact the visitor.',
    siteUrl,
  ].join('\n');

  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New contact inquiry</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4ebe3; font-family:Georgia, 'Times New Roman', serif;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0;">
      New inquiry from ${safeName} — ${safeEmail}
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4ebe3; padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px; background-color:#ffffff; border-radius:20px; overflow:hidden; box-shadow:0 18px 50px rgba(32,17,10,0.12);">
            <tr>
              <td style="background:linear-gradient(135deg, #20110A 0%, #4b2300 55%, #B8702F 100%); padding:36px 32px 28px; text-align:center;">
                <p style="margin:0 0 10px; font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#E6AE23; font-weight:700;">
                  Online Quran Academy
                </p>
                <h1 style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-size:28px; line-height:1.25; color:#ffffff; font-weight:700;">
                  ${safeSiteName}
                </h1>
                <p style="margin:12px 0 0; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:rgba(255,255,255,0.86);">
                  A new visitor just reached out through your website
                </p>
              </td>
            </tr>
            <tr>
              <td style="height:6px; background:linear-gradient(90deg, #B8702F 0%, #E6AE23 50%, #B8702F 100%); font-size:0; line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#faf6f2; border:1px solid #f0e2d4; border-radius:16px;">
                  <tr>
                    <td style="padding:20px 22px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td width="56" valign="top">
                            <div style="width:52px; height:52px; border-radius:50%; background:linear-gradient(135deg, #B8702F, #E6AE23); color:#ffffff; font-family:Georgia, 'Times New Roman', serif; font-size:22px; font-weight:700; line-height:52px; text-align:center;">
                              ${initial}
                            </div>
                          </td>
                          <td valign="middle" style="padding-left:14px;">
                            <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:12px; letter-spacing:1.4px; text-transform:uppercase; color:#B8702F; font-weight:700;">
                              New inquiry
                            </p>
                            <p style="margin:4px 0 0; font-family:Georgia, 'Times New Roman', serif; font-size:22px; color:#20110A; font-weight:700;">
                              ${safeName}
                            </p>
                            <p style="margin:4px 0 0; font-family:Arial, Helvetica, sans-serif; font-size:14px;">
                              <a href="mailto:${safeEmail}" style="color:#B8702F; text-decoration:none; font-weight:600;">${safeEmail}</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
                  <tr>
                    <td width="50%" valign="top" style="padding-right:8px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border:1px solid #f0e2d4; border-radius:14px;">
                        <tr>
                          <td style="padding:16px 18px;">
                            <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:#8a6a4a; font-weight:700;">Submitted</p>
                            <p style="margin:6px 0 0; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#20110A; font-weight:600;">${safeDate}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                    <td width="50%" valign="top" style="padding-left:8px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; border:1px solid #f0e2d4; border-radius:14px;">
                        <tr>
                          <td style="padding:16px 18px;">
                            <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:11px; letter-spacing:1.2px; text-transform:uppercase; color:#8a6a4a; font-weight:700;">Source</p>
                            <p style="margin:6px 0 0; font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#20110A; font-weight:600;">Website contact form</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <p style="margin:28px 0 10px; font-family:Arial, Helvetica, sans-serif; font-size:12px; letter-spacing:1.6px; text-transform:uppercase; color:#B8702F; font-weight:700;">
                  Message
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#fffaf5; border-left:4px solid #B8702F; border-radius:0 14px 14px 0;">
                  <tr>
                    <td style="padding:20px 22px; font-family:Georgia, 'Times New Roman', serif; font-size:16px; line-height:1.75; color:#3a2a1c;">
                      ${safeMessage}
                    </td>
                  </tr>
                </table>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:28px;">
                  <tr>
                    <td align="center">
                      <a href="${mailto}" style="display:inline-block; background:linear-gradient(135deg, #B8702F 0%, #a25e26 100%); color:#ffffff; font-family:Arial, Helvetica, sans-serif; font-size:15px; font-weight:700; text-decoration:none; padding:14px 28px; border-radius:999px; box-shadow:0 8px 20px rgba(184,112,47,0.28);">
                        Reply to ${safeName}
                      </a>
                    </td>
                  </tr>
                </table>
                <p style="margin:14px 0 0; text-align:center; font-family:Arial, Helvetica, sans-serif; font-size:12px; color:#8a6a4a;">
                  Or use Reply in your inbox — the visitor email is already set as Reply-To.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#20110A; padding:24px 32px; text-align:center;">
                <p style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-size:14px; font-style:italic; color:#E6AE23;">
                  “Seek knowledge from the cradle to the grave”
                </p>
                <p style="margin:10px 0 0; font-family:Arial, Helvetica, sans-serif; font-size:12px; color:rgba(255,255,255,0.7);">
                  ${safeSiteName} · <a href="${safeSiteUrl}" style="color:#E6AE23; text-decoration:none;">${safeSiteUrl.replace(/^https?:\/\//, '')}</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `.trim();

  return { html, text };
}
