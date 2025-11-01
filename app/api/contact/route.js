import nodemailer from 'nodemailer';

// Server-side validation and email sending
export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Validate inputs
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Configure nodemailer transporter
    // For Gmail: use App Passwords (https://support.google.com/accounts/answer/185833)
    // Set env vars: NEXT_PUBLIC_SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to you (recipient)
    const mailToYou = {
      from: process.env.SMTP_USER,
      to: 'bassanagasurya@gmail.com',
      subject: `New contact form submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Confirmation email to visitor
    const mailToVisitor = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'We received your message!',
      html: `
        <h2>Thank you for contacting us, ${name}!</h2>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr />
        <p><small>This is an automated response. Please do not reply to this email.</small></p>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailToYou);
    await transporter.sendMail(mailToVisitor);

    return Response.json(
      { success: true, message: 'Email sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}
