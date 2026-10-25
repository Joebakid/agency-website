import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot: bots fill this hidden field, people don't
    if (body.website) return NextResponse.json({ ok: true });

    const name = oneLine(String(body.name ?? '')).slice(0, 100);
    const email = oneLine(String(body.email ?? '')).slice(0, 200);
    const subject = oneLine(String(body.subject ?? '')).slice(0, 150) || 'New message';
    const message = String(body.message ?? '').trim().slice(0, 4000);

    if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 5) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO;
    if (!apiKey || !to) {
      console.error('Missing RESEND_API_KEY or CONTACT_TO');
      return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: 'Bawo Digital <onboarding@resend.dev>',
      to: [to],
      replyTo: email,
      subject: `${subject} · from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;color:#111">
          <h2 style="margin:0 0 16px">New message from your website</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:6px 0;color:#666;width:80px">Name</td><td><b>${esc(name)}</b></td></tr>
            <tr><td style="padding:6px 0;color:#666">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
            <tr><td style="padding:6px 0;color:#666">Subject</td><td>${esc(subject)}</td></tr>
          </table>
          <div style="background:#f5f5f5;padding:14px;border-radius:8px;white-space:pre-wrap;font-size:14px;margin-top:16px">${esc(message)}</div>
          <p style="color:#999;font-size:12px;margin-top:16px">Hit reply to respond directly to ${esc(name)}.</p>
        </div>`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact email failed:', err);
    return NextResponse.json({ error: 'Could not send your message. Please try again.' }, { status: 500 });
  }
}