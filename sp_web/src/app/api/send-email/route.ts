import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    console.log("Received form data:", formData);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: `SP Homes <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${formData.name}`,
      html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
            <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
              <div style="background-color: #004080; color: #ffffff; padding: 20px 30px;">
                <h2 style="margin: 0;">New Contact Form Submission</h2>
              </div>
              <div style="padding: 30px; color: #333333;">
                <p><strong style="color: #004080;">Name:</strong> ${formData.name}</p>
                <p><strong style="color: #004080;">Email:</strong> ${formData.email}</p>
                <p><strong style="color: #004080;">Phone:</strong> ${formData.phone}</p>
                <p><strong style="color: #004080;">Contact Preference:</strong> ${formData.contactPreferences}</p>
                <p><strong style="color: #004080;">Message:</strong></p>
                <p style="background-color: #f0f8ff; padding: 15px; border-radius: 6px;">${formData.message}</p>
              </div>
              <div style="background-color: #fafafa; padding: 15px 30px; text-align: center; font-size: 12px; color: #888888;">
                SP Homes • You received this email via contact form submission
              </div>
            </div>
          </div>
        `,
      headers: {
        "X-Entity-Ref-ID": "New Mail",
      },
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
