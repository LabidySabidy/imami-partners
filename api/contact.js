/**
 * Vercel Serverless Function — POST /api/contact
 * ------------------------------------------------
 * Receives the contact form (JSON) and emails it to the firm via Resend.
 *
 * SETUP:
 *  1. Create a Resend account → verify your sending domain (imamipartners.com)
 *  2. In Vercel dashboard → Settings → Environment Variables, add:
 *     RESEND_API_KEY = re_xxxxxxxxxxxxxxxx
 *  3. Optionally set TO_EMAIL / FROM_EMAIL there too (defaults below).
 */

const TO_DEFAULT = "maliha@imamipartners.com";
const FROM_DEFAULT = "Imami Partners <hello@imamipartners.com>";

function esc(s = "") {
  return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const data = req.body || {};
  const name = (data.name || "").trim();
  const email = (data.email || "").trim();
  const message = (data.message || "").trim();
  const organization = (data.organization || "").trim();
  const phone = (data.phone || "").trim();

  if (!name || !email || !message) {
    return res.status(422).json({ error: "Name, email, and message are required." });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(422).json({ error: "Please provide a valid email address." });
  }

  if (!process.env.RESEND_API_KEY) {
    console.log("Contact (no RESEND_API_KEY set):", { name, email, organization, phone, message });
    return res.status(200).json({ ok: true, note: "Logged; email provider not yet configured." });
  }

  const html = `
    <h2 style="font-family:Georgia,serif;color:#0F4B4D;">New message from imamipartners.com</h2>
    <p><strong>Name:</strong> ${esc(name)}</p>
    <p><strong>Organization:</strong> ${esc(organization) || "—"}</p>
    <p><strong>Email:</strong> ${esc(email)}</p>
    <p><strong>Phone:</strong> ${esc(phone) || "—"}</p>
    <hr />
    <p style="white-space:pre-wrap;">${esc(message)}</p>
  `;

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || FROM_DEFAULT,
        to: [process.env.TO_EMAIL || TO_DEFAULT],
        reply_to: email,
        subject: `New inquiry — ${name}${organization ? " · " + organization : ""}`,
        html,
      }),
    });

    if (!resp.ok) {
      console.error("Resend error:", await resp.text());
      return res.status(502).json({ error: "Could not send right now." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(502).json({ error: "Could not send right now." });
  }
}
