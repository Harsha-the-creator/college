# Complete Email System Setup Guide

## 🎯 What You Get

Your admission system now sends **three types of emails**:

1. **✉️ Student Confirmation Email** - Sent immediately when student submits application
   - Confirms receipt of application
   - Shows application ID
   - Provides tracking link
   - Recipient: Student's email (from form)

2. **✉️ Admin Notification Email** - Sent immediately when student submits application
   - Full application details
   - All student and parent information
   - Direct link to admin dashboard
   - Recipient: `gayatricollege02245@gmail.com`

3. **✉️ Status Update Email** - Sent when admin approves/rejects application
   - Approval/Rejection decision with next steps
   - Required documents list (if approved)
   - Personalized message based on decision
   - Recipient: Student's email (from form)

---

## 📋 Setup Checklist

- [ ] Create EmailJS Account
- [ ] Connect Gmail Service
- [ ] Create 3 Email Templates in EmailJS
- [ ] Get Credentials (Service ID, Template IDs, Public Key)
- [ ] Update `js/email-config.js` with credentials
- [ ] Test by submitting application

---

## 🚀 Step-by-Step Setup

### Step 1: Create EmailJS Account

1. Visit: **https://www.emailjs.com/**
2. Click **"Sign Up Free"**
3. Create account using your email
4. Verify your email address
5. Log into your dashboard

### Step 2: Connect Gmail Service

1. In EmailJS dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Select **"Gmail"** from the list
4. Click **"Connect Account"**
5. **Important:** Select `gayatricollege02245@gmail.com` when prompted
6. Grant EmailJS permission to send emails from Gmail
7. Your service is now connected!
8. **Copy and save the Service ID** (looks like: `service_xxxxxxxxxxxxxxxxx`)

### Step 3: Create Email Templates

Go to **Email Templates** in EmailJS dashboard and create these three templates:

#### Template 1: Admin Notification
1. Click **"Create New Template"**
2. Name: `template_admin_notification`
3. To Email: `{{to_email}}`
4. Subject: `New Application Submission - {{application_id}}`
5. Copy the HTML from `EMAIL_TEMPLATES_SETUP.md` (Template 1 section)
6. Click **"Save"**
7. **Copy the Template ID**

#### Template 2: Student Confirmation
1. Click **"Create New Template"**
2. Name: `template_student_confirmation`
3. To Email: `{{to_email}}`
4. Subject: `Application Received - Your ID: {{application_id}} | GAYATRI JUNIOR & DEGREE COLLEGE`
5. Copy the HTML from `EMAIL_TEMPLATES_SETUP.md` (Template 2 section)
6. Click **"Save"**
7. **Copy the Template ID**

#### Template 3: Status Update
1. Click **"Create New Template"**
2. Name: `template_status_update`
3. To Email: `{{to_email}}`
4. Subject: `{{subject}}`
5. Copy the HTML from `EMAIL_TEMPLATES_SETUP.md` (Template 3 section)
6. Click **"Save"**
7. **Copy the Template ID**

### Step 4: Get Your Public Key

1. In EmailJS dashboard, click **"Account"** (top right)
2. Scroll down to **"API Keys"** section
3. **Copy your Public Key** (looks like: `E_8b6VCPdtHzYjvPP`)

### Step 5: Update Configuration File

1. Open `js/email-config.js` in your project
2. Update the following values:

```javascript
const EMAIL_CONFIG = {
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY_HERE',           // Paste your Public Key
  SERVICE_ID: 'service_xxxxxxxxxxxxxxxxx',      // Paste your Service ID
  TEMPLATE_ID: 'template_admin_notification',   // (This name stays the same)
  ADMIN_EMAIL: 'gayatricollege02245@gmail.com'  // (This stays the same)
};
```

**Example (with dummy values):**
```javascript
const EMAIL_CONFIG = {
  PUBLIC_KEY: 'E_8b6VCPdtHzYjvPP',
  SERVICE_ID: 'service_abcd1234efgh5678',
  TEMPLATE_ID: 'template_admin_notification',
  ADMIN_EMAIL: 'gayatricollege02245@gmail.com'
};
```

### Step 6: Test the System

1. **Open** your admission form: `apply.html`
2. **Fill out** all fields completely:
   - Student name, DOB, gender
   - Parent name, email, phone
   - Address, class, previous school
   - Upload a document (PDF/PNG/JPG)
3. **Submit** the application
4. You should see a success message
5. **Check your emails:**
   - **Admin email** should receive notification at `gayatricollege02245@gmail.com`
   - **Student email** should receive confirmation at the email address provided in form
6. **Check browser console** (F12) for any error messages

---

## 📧 Email Flow Overview

```
┌─────────────────────────────────────────────────────────────┐
│ STUDENT SUBMITS APPLICATION FORM                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┬──────────────┐
        │                              │              │
        ▼                              ▼              ▼
   ✅ CONFIRMATION                ✅ ADMIN         ✅ SIMULATED
      (Student Email)            NOTIFICATION     LOG
                                   (Admin Email)   (Dashboard)
        
         │
         │ (After 5-7 days)
         │ Admin reviews and updates status
         │
        ▼
   ✅ STATUS UPDATE EMAIL
      (Student Email)
      - If Approved: Next steps + required docs
      - If Rejected: Regret notice
      - If Pending: Wait message
```

---

## 🔧 File Structure

Your email system uses these files:

```
school/
├── apply.html                    (Frontend - Student form)
│   └── Includes: EmailJS script + email-config.js
│
├── dashboard.html                (Admin interface)
│   └── Includes: EmailJS script + email-config.js
│
├── js/
│   ├── email-config.js           ⚙️  UPDATE THIS FILE
│   │   └── YOUR API credentials go here
│   │
│   ├── db.js                     (Database + email logic)
│   │   ├── createApplication()
│   │   │   ├── sendStudentConfirmationEmail()
│   │   │   └── sendAdminNotificationEmail()
│   │   │
│   │   └── updateApplicationStatus()
│   │       └── sendStudentStatusUpdateEmail()
│   │
│   ├── form.js                   (Form validation)
│   │   └── submitApplication() → DB.createApplication()
│   │
│   └── dashboard.js              (Admin panel)
│       └── updateStatus() → DB.updateApplicationStatus()
│
├── EMAIL_TEMPLATES_SETUP.md      (HTML templates)
├── EMAIL_SETUP_GUIDE.md          (Original setup guide)
└── COMPLETE_EMAIL_SETUP.md       (This file)
```

---

## 🐛 Troubleshooting

### "Email not received" Issues

**Check 1: Spam Folder**
- Check your spam/junk folder in Gmail
- EmailJS emails sometimes end up there initially
- Mark emails as "Not spam" to train Gmail

**Check 2: Verify Credentials**
- Open `js/email-config.js`
- Make sure ALL values are copied exactly (case-sensitive)
- No extra spaces at beginning or end

**Check 3: Check EmailJS Service**
- Log into EmailJS dashboard
- Go to **Email Services**
- Verify Gmail is still connected and green
- If red, reconnect Gmail

**Check 4: Check Templates**
- Verify template names are EXACTLY:
  - `template_admin_notification`
  - `template_student_confirmation`
  - `template_status_update`
- Verify all `{{variable}}` names are correct (case-sensitive)

**Check 5: Browser Console**
- Open Developer Tools (F12)
- Go to Console tab
- Submit application again
- Look for error messages starting with `[ERROR]` or `[EMAIL]`
- Copy any error messages for support

**Check 6: Gmail Connection**
- If using 2-Factor Authentication on Gmail:
  - Generate an App Password from Google Account
  - Use this password instead of regular password in EmailJS
  - Guide: https://support.google.com/accounts/answer/185833

### "Form won't submit" Issues

- Usually means email service isn't configured correctly
- Emails won't block submission (they fail silently)
- Check browser console for JavaScript errors
- Verify `email-config.js` has valid syntax

### "Wrong email content" Issues

- Check template HTML in EmailJS
- Verify variable names match: `{{student_name}}`, `{{parent_name}}`, etc.
- Make sure you copied full HTML without truncation

---

## ✅ Verification Checklist

After setup, verify everything works:

```
ADMIN NOTIFICATION TEST:
□ Can you see [ADMIN EMAIL SENT] in browser console?
□ Did admin email arrive within 2 minutes?
□ Does email contain student name, class, application ID?

STUDENT CONFIRMATION TEST:
□ Can you see [STUDENT EMAIL SENT] in browser console?
□ Did student email arrive within 2 minutes?
□ Does email contain application ID and tracking link?

ADMIN STATUS UPDATE TEST:
□ Go to admin dashboard
□ Find the test application
□ Click "Approve" or "Reject"
□ Can you see [STUDENT STATUS EMAIL SENT] in console?
□ Did student receive approval/rejection email within 2 minutes?

GENERAL CHECKS:
□ All variables in email are filled (no {{variable}} placeholders)?
□ Email formatting looks professional and readable?
□ Links in emails work correctly?
□ Student can track application via link in email?
```

---

## 📞 Need Help?

### Quick Fixes
1. **Hard refresh browser** (Ctrl+Shift+R or Cmd+Shift+R)
2. **Clear browser cache** and restart
3. **Check internet connection** is stable
4. **Verify credentials once more** in email-config.js

### Check Logs
1. Open browser Developer Tools (F12)
2. Go to **Console** tab
3. Submit application
4. Look for messages with:
   - `[ADMIN EMAIL SENT]` - admin email went through
   - `[STUDENT EMAIL SENT]` - student email went through
   - `[ERROR]` or red errors - something failed

### Contact EmailJS Support
- If credentials are correct but emails don't send:
  - Visit: https://www.emailjs.com/
  - Click support/help
  - Gmail connection might need reconnection

---

## 🎉 You're All Set!

Your admission system now automatically:
- ✅ Sends confirmation to students when they apply
- ✅ Notifies admin of new applications
- ✅ Sends status updates when decisions are made
- ✅ Provides professional email templates
- ✅ Tracks all emails in admin dashboard

**Next Steps:**
1. Complete Step 5 above
2. Test with the test application
3. Check all three email types arrive
4. You're ready for real submissions!

---

## 📝 Quick Reference

| What | Where | How |
|------|-------|-----|
| Update API Keys | `js/email-config.js` | Edit file, paste credentials |
| View Email Templates | EmailJS Dashboard | Email Templates section |
| Change Admin Email | `js/email-config.js` | Change `ADMIN_EMAIL` value |
| Test System | `apply.html` | Submit test application |
| Check Send Status | Browser Console | F12 → Console tab |
| Troubleshoot | `EMAIL_TEMPLATES_SETUP.md` | See template validation section |

---

**Setup completed on:** 2026-06-20
**System Status:** Ready for Configuration ⏳ → Active ✅

