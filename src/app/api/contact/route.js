import { createMailTransporter, getMailMeta } from '@/lib/mailer';
import { buildContactEmail } from '@/lib/contactEmailTemplate';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validatePayload(body) {
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';
  const errors = {};

  if (!name) {
    errors.name = 'Full name is required';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!message) {
    errors.message = 'Message cannot be empty';
  } else if (message.length < 10) {
    errors.message = 'Message should be at least 10 characters';
  }

  return { name, email, message, errors };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, errors } = validatePayload(body);

    if (Object.keys(errors).length > 0) {
      return Response.json({ ok: false, errors }, { status: 400 });
    }

    const { smtpUser, receiver, fromName, siteName, siteUrl } = getMailMeta();
    const transporter = createMailTransporter();
    const submittedAt = new Date().toLocaleString('en-PK', {
      timeZone: 'Asia/Karachi',
    });
    const { html, text } = buildContactEmail({
      name,
      email,
      message,
      submittedAt,
      siteName,
      siteUrl,
    });

    await transporter.sendMail({
      from: `"${fromName}" <${smtpUser}>`,
      to: receiver,
      replyTo: `"${name}" <${email}>`,
      subject: `New contact inquiry from ${name} | ${siteName}`,
      text,
      html,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Contact email error:', error);
    return Response.json(
      { ok: false, message: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
