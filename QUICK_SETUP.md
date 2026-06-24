# ⚡ Quick Setup - Email Notifications for Admin

## What's Configured
✅ Your application form now sends email notifications to `gayatricollege02245@gmail.com` when students submit applications.

## 3-Step Setup Required

### Step 1️⃣: Create EmailJS Account (2 min)
1. Visit: https://www.emailjs.com/
2. Click "Sign Up Free"
3. Sign up and verify your email

### Step 2️⃣: Set Up Gmail in EmailJS (5 min)
1. Log into EmailJS dashboard
2. Go to **Email Services** → **Add Service**
3. Select **Gmail**
4. Connect your Gmail account: `gayatricollege02245@gmail.com`
5. Grant permission when prompted
6. Copy the **Service ID** (looks like: `service_xxxxxxxxxx`)

### Step 3️⃣: Create Email Template (3 min)
1. In EmailJS, go to **Email Templates** → **Create New Template**
2. Set name: `template_admin_notification`
3. Set **To Email** field to: `{{to_email}}`
4. Set **Subject** to: `New Application Submission - {{application_id}}`
5. For the HTML content, use the template from `EMAIL_SETUP_GUIDE.md`
6. Copy the **Template ID**

### Step 4️⃣: Get Your Public Key (1 min)
1. Go to **Account** settings in EmailJS
2. Copy your **Public Key**

### Step 5️⃣: Update Configuration (1 min)
Open `js/email-config.js` and update these values:

```javascript
const EMAIL_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',      // Paste your EmailJS public key
  SERVICE_ID: 'service_xxxxxxxxxx',        // Paste your Service ID
  TEMPLATE_ID: 'template_admin_notification', // Paste your Template ID
  ADMIN_EMAIL: 'gayatricollege02245@gmail.com'
};
```

## ✅ Done!
Test by:
1. Opening the admission form
2. Filling it out completely
3. Submitting it
4. Check your admin email in 1-2 minutes for the notification

## 📁 Files Modified
- `apply.html` - Added EmailJS script
- `js/db.js` - Added email sending function
- `js/email-config.js` - New configuration file
- `EMAIL_SETUP_GUIDE.md` - Detailed setup guide

## Troubleshooting
- **No email received?** Check spam folder
- **404 errors?** Make sure all IDs are copied exactly
- **Gmail connection error?** Reconnect in EmailJS Email Services

For more details, see `EMAIL_SETUP_GUIDE.md`
