import nodemailer from 'nodemailer';

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = String(process.env.SMTP_SECURE).toLowerCase() === 'true';
  const user = process.env.SMTP_USER;
  const pass = (process.env.SMTP_APP_PASSWORD || '').replace(/\s+/g, '');

  if (!host || !user || !pass) {
    throw new Error('SMTP is not configured');
  }

  return { host, port, secure, user, pass };
}

export function createMailTransporter() {
  const { host, port, secure, user, pass } = getSmtpConfig();

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

export function getMailMeta() {
  const { user } = getSmtpConfig();
  const receiver = process.env.CONTACT_RECEIVER_EMAIL;
  const fromName = process.env.CONTACT_FROM_NAME || process.env.NEXT_PUBLIC_SITE_NAME || 'Easy Quran Class';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Easy Quran Class';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://easyquranclass.com';

  if (!receiver) {
    throw new Error('CONTACT_RECEIVER_EMAIL is not configured');
  }

  return {
    smtpUser: user,
    receiver,
    fromName,
    siteName,
    siteUrl,
  };
}
