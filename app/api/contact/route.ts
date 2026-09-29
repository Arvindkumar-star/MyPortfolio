import { Resend } from "resend";
import nodemailer from "nodemailer";
import profile from "@/content/profile.json";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, message, honeypot } = await req.json();

    // Honeypot bot trap
    if (honeypot) {
      return Response.json({ success: true });
    }

    if (!name || !email || !message) {
      return Response.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const targetEmail = profile.contact.email; // shivantag2022@gmail.com
    let emailDelivered = false;

    // 1. Try Resend if RESEND_API_KEY is present
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
          to: [targetEmail],
          replyTo: email,
          subject: `✨ New Portfolio Message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #111; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; rounded: 10px;">
              <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 8px;">New Portfolio Contact</h2>
              <p><strong>From:</strong> ${name} &lt;<a href="mailto:${email}">${email}</a>&gt;</p>
              <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
              <p><strong>Message:</strong></p>
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #6366f1; white-space: pre-wrap;">${message}</div>
            </div>
          `,
        });
        if (!error) {
          emailDelivered = true;
          console.log(`[Contact Form] Email successfully delivered via Resend to ${targetEmail}`);
        } else {
          console.warn("[Contact Form] Resend error:", error);
        }
      } catch (e) {
        console.warn("[Contact Form] Failed sending via Resend:", e);
      }
    }

    // 2. Try Nodemailer / Gmail SMTP if configured
    if (!emailDelivered && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"${name}" <${process.env.SMTP_USER}>`,
          to: targetEmail,
          replyTo: email,
          subject: `✨ New Portfolio Inquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        });

        emailDelivered = true;
        console.log(`[Contact Form] Email successfully sent via SMTP to ${targetEmail}`);
      } catch (e) {
        console.warn("[Contact Form] Failed sending via SMTP:", e);
      }
    }

    // Fallback logging for local testing when keys are unconfigured
    console.log(`\n======================================================`);
    console.log(`[CONTACT FORM SUBMISSION]`);
    console.log(`To: ${targetEmail}`);
    console.log(`From: ${name} (${email})`);
    console.log(`Message: ${message}`);
    console.log(`Delivered via live email service: ${emailDelivered}`);
    console.log(`======================================================\n`);

    return Response.json({
      success: true,
      delivered: emailDelivered,
      directMailto: `mailto:${targetEmail}?subject=${encodeURIComponent(
        `Portfolio Message from ${name}`
      )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`,
    });
  } catch (err: unknown) {
    console.error("Error submitting contact form:", err);
    return Response.json(
      { error: "Failed to submit contact form." },
      { status: 500 }
    );
  }
}
