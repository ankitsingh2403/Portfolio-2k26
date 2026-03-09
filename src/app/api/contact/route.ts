import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, organization, services, message } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const currentDate = new Date().toLocaleString();

    await transporter.sendMail({
      from: `"Portfolio Enquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `🚀 New Freelance Opportunity from ${name}`,
      html: `
      <div style="font-family:Arial, Helvetica, sans-serif; line-height:1.6; color:#333">
        
        <h2 style="color:#111">📩 New Freelance Enquiry Received</h2>
        
        <p>You have received a new project enquiry from your portfolio website.</p>

        <hr style="margin:20px 0"/>

        <h3>👤 Client Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization || "Not Provided"}</p>

        <hr style="margin:20px 0"/>

        <h3>🛠 Requested Services</h3>
        <p>${services || "Not specified"}</p>

        <hr style="margin:20px 0"/>

        <h3>💬 Client Message</h3>
        <p style="background:#f5f5f5;padding:15px;border-radius:6px">
          ${message}
        </p>

        <hr style="margin:20px 0"/>

        <h3>📅 Enquiry Details</h3>
        <p><strong>Received At:</strong> ${currentDate}</p>

        <hr style="margin:20px 0"/>

        <p>
          Please reply directly to the client at 
          <strong>${email}</strong> to continue the discussion.
        </p>

        <br/>

        <p style="font-size:14px;color:#777">
          This message was automatically generated from your portfolio contact form.
        </p>

        <br/>

        <p style="font-weight:bold">
          — Portfolio Website | Ankit Kumar Singh
        </p>

      </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false });
  }
}