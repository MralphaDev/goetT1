import { getConnection } from '../../lib/db.js';
import nodemailer from "nodemailer";

export async function POST(req) {
  const { password, email, isSignUp, step, code } = await req.json();
  const conn = await getConnection();
  global.verificationCodes = global.verificationCodes || {};

  try {
    if (isSignUp) {
      if (step === 1) {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        global.verificationCodes[email] = verificationCode;

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: { user: "wangvison742@gmail.com", pass: "ttvx ujsz ybov nlyf" },
        });

      await transporter.sendMail({
        from: '"GOET Auth" <wangvison742@gmail.com>',
        to: email,
        subject: "🚀 Verify Your GOETVALVE Account",
        html: `
          <div style="
            font-family: 'Arial', sans-serif; 
            background: #f0f4f8; 
            padding: 40px; 
            text-align: center;
          ">
<h1 style="
  font-size: 32px; 
  font-weight: 900; 
  color: #111;
  margin-bottom: 10px;
  font-family: 'Arial Black', Helvetica, sans-serif;
">
  <span style="font-weight:900;">GÖET</span><span style="font-weight:100;">V</span><span style="font-weight:100; font-family: Arial, Helvetica, sans-serif; text-transform: lowercase;">alve</span>
</h1>




            <p style="font-size:16px; color:#4b5563; margin-bottom:30px;">
              Complete your sign-up by entering the verification code below.
            </p>

            <!-- Verification Code Box -->
            <div style="
              display: inline-block;
              padding: 20px 40px;
              font-size: 32px;
              font-weight: bold;
              color: #111;
              background: linear-gradient(135deg, #6366f1, #8b5cf6);
              border-radius: 12px;
              letter-spacing: 4px;
              animation: fadeIn 1s ease-in-out forwards;
            ">
              ${verificationCode}
            </div>

            <!-- Footer -->
            <p style="font-size:14px; color:#6b7280; margin-top: 30px;">
              This code expires in 10 minutes.
            </p>
            <p style="font-size:12px; color:#9ca3af; margin-top:20px;">
              — GOETVALVE Team
            </p>

            <!-- Keyframe animation -->
            <style>
              @keyframes fadeIn {
                0% { opacity: 0; transform: translateY(-10px); }
                100% { opacity: 1; transform: translateY(0); }
              }
            </style>
          </div>
        `,
      });


        return new Response(JSON.stringify({ message: "Verification code sent" }), { status: 200 });
      }

      if (step === 2) {
        if (!code || global.verificationCodes[email] !== code) {
          return new Response(JSON.stringify({ message: "Invalid verification code" }), { status: 400 });
        }

        const [rows] = await conn.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length > 0) {
          delete global.verificationCodes[email];
          return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
        }

        const [result] = await conn.execute("INSERT INTO users (email, password) VALUES (?, ?)", [email, password]);
        delete global.verificationCodes[email];

        return new Response(JSON.stringify({ user: { id: result.insertId, password, email }, message: "Sign up successful" }), { status: 200 });
      }

      // fallback only if step is missing or wrong
      return new Response(JSON.stringify({ message: "Step missing or invalid" }), { status: 400 });
    } else {
      // sign-in
      const [rows] = await conn.execute("SELECT * FROM users WHERE password = ? AND email = ?", [password, email]);
      if (rows.length === 0) return new Response(JSON.stringify({ message: "User not found" }), { status: 400 });
      return new Response(JSON.stringify({ user: rows[0], message: "Logged in successfully" }), { status: 200 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  } finally {
    await conn.end();
  }
}
