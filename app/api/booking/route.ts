import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Honeypot: bots fill this hidden field, humans don't
    if (body.website) return NextResponse.json({ ok: true });

    const name = oneLine(String(body.name ?? '')).slice(0, 100);
    const email = oneLine(String(body.email ?? '')).slice(0, 200);
    const notes = String(body.notes ?? '').slice(0, 2000);
    const dateLabel = oneLine(String(body.dateLabel ?? '')).slice(0, 100);
    const time = oneLine(String(body.time ?? '')).slice(0, 20);

    if (!name || !/^\S+@\S+\.\S+$/.test(email) || !dateLabel || !time) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) {
      console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD');
      return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });

    const when = `${dateLabel} at ${time} (WAT)`;

    // 1) Notification to you
    await transporter.sendMail({
      from: `"Bawo Digital Bookings" <${user}>`,
      to: process.env.BOOKING_TO || user,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `New Discovery Call: ${name} · ${dateLabel}, ${time}`,
      text: `New booking\n\nName: ${name}\nEmail: ${email}\nWhen: ${when}\n\nNotes:\n${notes || 'None'}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#111">
          <h2 style="margin:0 0 16px">New Discovery Call</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 0;color:#666;width:90px">Name</td><td><b>${esc(name)}</b></td></tr>
            <tr><td style="padding:8px 0;color:#666">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
            <tr><td style="padding:8px 0;color:#666">When</td><td><b>${esc(when)}</b></td></tr>
          </table>
          <p style="color:#666;font-size:13px;margin:20px 0 6px">Notes</p>
          <div style="background:#f5f5f5;padding:12px;border-radius:8px;white-space:pre-wrap;font-size:14px">${esc(notes) || 'None'}</div>
          <p style="color:#999;font-size:12px;margin-top:20px">Hit reply to respond directly to the client.</p>
        </div>`,
    });

    // 2) Confirmation to the client
    await transporter.sendMail({
      from: `"Bawo Digital" <${user}>`,
      to: email,
      subject: `We received your request: ${dateLabel}, ${time}`,
      text: `Hi ${name},\n\nThanks for booking a discovery call with Bawo Digital.\n\nRequested time: ${when}\n\nWe'll confirm shortly with the meeting link.\n\n- Bawo Digital`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#111">
          <h2 style="margin:0 0 12px">Request received ✓</h2>
          <p>Hi ${esc(name)}, thanks for booking a discovery call with <b>Bawo Digital</b>.</p>
          <p style="background:#f5f5f5;padding:14px;border-radius:8px"><b>${esc(when)}</b><br/>30 minutes · online</p>
          <p>We'll confirm shortly with the meeting link.</p>
          <p style="color:#999;font-size:12px">- Bawo Digital</p>
        </div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Booking email failed:', err);
    return NextResponse.json({ error: 'Could not send your request. Please try again.' }, { status: 500 });
  }
}