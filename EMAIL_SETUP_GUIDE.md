# Email Notification Setup Guide

## Overview
The admission system is now configured to send email notifications to the admin email address (`gayatricollege02245@gmail.com`) whenever a student submits an application.

## How It Works
1. When a student submits an application through the admission form
2. The system automatically sends an email to the admin with all application details
3. The student also receives a confirmation email to their provided email address

## Setup Instructions (EmailJS Service)

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up Free"
3. Create an account with your email address
4. Verify your email

### Step 2: Add Email Service
1. Log in to your EmailJS account
2. Go to **Email Services** (left sidebar)
3. Click **Add Service**
4. Select **Gmail** (or your preferred email provider)
5. Follow the setup instructions:
   - Connect your Gmail account (`gayatricollege02245@gmail.com`)
   - Grant EmailJS permission to send emails
6. Copy the **Service ID** (it looks like `service_xxxxxxxxx`)

### Step 3: Create Email Template for Admin Notifications
1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Set the template name as: `template_admin_notification`
4. Configure the template with the following:

**Template Settings:**
- **To Email:** `{{to_email}}`
- **Subject:** `New Application Submission - {{application_id}}`
- **Content (HTML):**

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2563eb; color: white; padding: 20px; border-radius: 5px; }
        .content { background-color: #f8f9fa; padding: 20px; margin-top: 20px; border-radius: 5px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #2563eb; }
        .button { background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>New Application Received</h2>
        </div>
        
        <div class="content">
            <p>Hello Admin,</p>
            <p>A new admission application has been submitted. Here are the details:</p>
            
            <div class="field">
                <span class="label">Student Name:</span> {{student_name}}
            </div>
            
            <div class="field">
                <span class="label">Parent Name:</span> {{parent_name}}
            </div>
            
            <div class="field">
                <span class="label">Parent Email:</span> {{parent_email}}
            </div>
            
            <div class="field">
                <span class="label">Class Applying For:</span> {{class_applying}}
            </div>
            
            <div class="field">
                <span class="label">Application ID:</span> {{application_id}}
            </div>
            
            <p>Full Details:</p>
            <pre style="background-color: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 3px;">{{email_body}}</pre>
            
            <p>
                <a href="[YOUR_DOMAIN]/dashboard.html" class="button">Review Application in Dashboard</a>
            </p>
            
            <p>Best regards,<br>Admission System</p>
        </div>
    </div>
</body>
</html>
```

### Step 4: Get Your Public Key
1. Go to **Account** settings in EmailJS
2. Copy your **Public Key** (it looks like `E_8b6VCPdtHzYjvPP` or similar)

### Step 5: Update Your Website Code
1. Open `apply.html`
2. Find the EmailJS initialization script:
```javascript
emailjs.init("E_8b6VCPdtHzYjvPP");
```
3. Replace `E_8b6VCPdtHzYjvPP` with your actual **Public Key** from step 4

4. Update your Service ID and Template ID in `js/db.js`:
   - Look for the `sendAdminNotificationEmail()` function
   - Replace `'service_gayatri_admin'` with your Service ID from step 2
   - Replace `'template_admin_notification'` with your Template ID from step 3

### Step 6: Test the Setup
1. Open your admission form: `apply.html`
2. Fill out the form completely
3. Submit the application
4. Check your admin email (`gayatricollege02245@gmail.com`) for the notification
5. The email should arrive within 1-2 minutes

## Email Content
The admin will receive an email containing:
- Student Name
- Date of Birth
- Gender
- Parent/Guardian details
- Contact information
- Class applying for
- Document information
- Application ID
- Submission timestamp

## Troubleshooting

### Email Not Arriving
1. **Check Spam Folder:** EmailJS emails sometimes end up in spam
2. **Verify Service Connection:** Log into EmailJS and check if the Gmail connection is still active
3. **Check Template ID:** Make sure the template ID in code matches EmailJS
4. **Browser Console:** Open browser developer tools (F12) and check for errors

### Issues with Gmail
1. If using Gmail, you may need to enable "Less secure apps" or use an [App Password](https://support.google.com/accounts/answer/185833)
2. Gmail's SMTP settings sometimes need adjustment in EmailJS

## Alternative Email Services

### Option 1: Firebase Cloud Functions (Recommended for production)
- Uses your existing Firebase setup
- More secure and scalable
- Requires backend setup

### Option 2: Formspree
- Simpler setup
- No server required
- Visit [Formspree.io](https://formspree.io)

### Option 3: SendGrid / Mailgun
- Professional email services
- Better deliverability for production
- More configuration required

## Code Location Reference
- **Main form:** `apply.html`
- **Database layer:** `js/db.js` (contains `sendAdminNotificationEmail()` function)
- **Form submission logic:** `js/form.js` (calls `DB.createApplication()`)

## Security Notes
- Your EmailJS Public Key is public (it's meant to be)
- Make sure Gmail app passwords are secure
- Don't share your Private Key or full Gmail password
- For production, consider using Firebase Cloud Functions for better security

## Support
If you encounter issues:
1. Check the browser console for error messages
2. Verify your EmailJS service is active and connected to Gmail
3. Make sure template variable names match exactly (case-sensitive)
4. Ensure all IDs (Service ID, Template ID, Public Key) are correct
