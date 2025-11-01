# Contact Form Email Setup Guide

Your contact form is now fully integrated with email sending capabilities. Here's how to set it up:

## Quick Setup (Gmail - 5 minutes)

### 1. Enable Gmail App Password

1. Go to [Google Account Settings](https://myaccount.google.com)
2. Navigate to **Security** (left sidebar)
3. Enable **2-Step Verification** if not already done
4. Scroll to **App passwords** and select:
   - App: **Mail**
   - Device: **Windows Computer** (or your device)
5. Generate a 16-character password
6. Copy this password (without spaces)

### 2. Create `.env.local` file

In your project root (`d:\Repooo-main\surya_naga\`), create a file named `.env.local`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=paste-your-16-char-app-password-here
```

**Example:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=bassanagasurya@gmail.com
SMTP_PASS=abcd efgh ijkl mnop
```

### 3. Install dependencies

```bash
cd D:\Repooo-main\surya_naga
npm install
```

### 4. Test the contact form

```bash
npm run dev
```

Navigate to `http://localhost:3000#contact` and submit a test message.

---

## How It Works

1. **Frontend** (`components/contact.jsx`):
   - User fills in name, email, and message
   - Client-side validation checks required fields and email format
   - Form submits to `/api/contact` endpoint

2. **Backend** (`app/api/contact/route.js`):
   - Server-side validation (security)
   - Sends two emails using Nodemailer:
     - **Email to you**: New submission alert
     - **Email to visitor**: Confirmation they contacted you
   - Returns success/error response

3. **Result**: Messages land in your Gmail inbox!

---

## Email Flow

```
User fills form → Validates client-side → Submits to API
                                               ↓
                                    Server validates
                                               ↓
                                    Sends 2 emails:
                                    • To: bassanagasurya@gmail.com (alert)
                                    • To: visitor's email (confirmation)
                                               ↓
                                    Returns success response
                                               ↓
                                    Show confirmation on page
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Failed to send email" | Check `.env.local` exists with correct credentials |
| "SMTP auth failed" | Verify Gmail app password (no spaces) and 2FA enabled |
| "Module not found: nodemailer" | Run `npm install` |
| Emails not arriving | Check spam folder; whitelist `bassanagasurya@gmail.com` |

---

## Alternative Services

### SendGrid
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get API key from dashboard
3. Update `.env.local`:
```
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=SG.your-api-key-here
```

### Resend (Modern alternative)
1. Sign up at [resend.com](https://resend.com)
2. Create `.env.local`:
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
```
3. Update `app/api/contact/route.js` to use Resend SDK

---

## Security Notes

- ✅ Environment variables are kept in `.env.local` (not committed to git)
- ✅ Server-side validation prevents injection attacks
- ✅ Rate limiting recommended for production (add middleware)
- ✅ Consider ReCAPTCHA v3 for bot protection

---

## Next Steps

- [ ] Set up `.env.local` with Gmail credentials
- [ ] Run `npm install`
- [ ] Test the contact form
- [ ] (Optional) Add reCAPTCHA for spam protection
- [ ] Deploy to production (Vercel auto-detects `.env.local`)

---

**Questions?** Check the component code in `components/contact.jsx` and API route in `app/api/contact/route.js`.
