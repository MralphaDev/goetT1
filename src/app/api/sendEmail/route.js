import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, cart, total,orderNumber } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: { user: "wangvison742@gmail.com", pass: "ttvx ujsz ybov nlyf" },
    });

    const itemsHtml = cart.map(item => `
      <li>${item.quantity} x ${item.name} @ ${item.price}</li>
    `).join("");

await transporter.sendMail({
  from: '"GOETVALVE" <wangvison742@gmail.com>',
  to: email,
  subject: `🛒 Your GOETVALVE Order Confirmation - ${orderNumber}`,
  html: `
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color:#f4f4f7; padding: 40px;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
      
      <!-- Header -->
      <div style="background:#4F46E5; color:#ffffff; padding:20px 30px; text-align:center;">
        <h1 style="margin:0; font-size:24px;">Thank you for your order, ${name}!</h1>
      </div>

      <!-- Body -->
      <div style="padding:30px; color:#333333;">
        <p style="font-size:16px; line-height:1.5;">We’re excited to confirm your purchase. Here’s a summary of your order:</p>

        <!-- Order Items -->
        <div style="margin-top:20px; border-top:1px solid #e0e0e0; padding-top:20px;">
          <ul style="list-style:none; padding:0; margin:0;">
            ${itemsHtml}
          </ul>
        </div>

        <!-- Total -->
        <div style="margin-top:20px; font-size:16px; font-weight:600;">
          Total: <span style="color:#4F46E5;">€${total}</span>
        </div>

        <p style="margin-top:30px; font-size:14px; color:#666666;">
          We’ll send you updates when your order ships. Thank you for choosing GOETVALVE!
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f4f4f7; color:#999999; text-align:center; padding:15px; font-size:12px;">
        — GOETVALVE Team
      </div>
    </div>
  </div>
  `,
});


    return new Response(JSON.stringify({ message: "Confirmation email sent" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
