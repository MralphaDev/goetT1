import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ message: "All fields required" }), { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "wangvison742@gmail.com", // 你发信邮箱
        pass: "ttvx ujsz ybov nlyf",    // 应用专用密码
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "hanmavon@gmail.com",
      subject: `Contact Form Message from ${name}`,
      html: `<p>${message}</p><p>From: ${name} (${email})</p>`,
    });

    return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Failed to send email" }), { status: 500 });
  }
}
