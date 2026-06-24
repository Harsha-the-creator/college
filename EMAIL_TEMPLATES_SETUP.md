# Email Templates Setup Guide

This guide covers setting up the three email templates needed for your admission system:
1. **Admin Notification** - When student submits application
2. **Student Confirmation** - When student submits application  
3. **Status Update** - When admin approves/rejects/updates application

---

## Template 1: Admin Notification Template

**Template Name:** `template_admin_notification`

**Template Settings:**
- **To Email:** `{{to_email}}`
- **Subject:** `New Application Submission - {{application_id}}`

**HTML Content:**

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2563eb; color: white; padding: 20px; border-radius: 5px; text-align: center; }
        .content { background-color: #f8f9fa; padding: 20px; margin-top: 20px; border-radius: 5px; }
        .field { margin-bottom: 12px; padding: 10px; background-color: white; border-left: 4px solid #2563eb; }
        .label { font-weight: bold; color: #2563eb; display: block; font-size: 0.9em; margin-bottom: 3px; }
        .button { background-color: #2563eb; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
        .footer { color: #666; font-size: 0.9em; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🎓 New Application Received</h2>
            <p>Application ID: {{application_id}}</p>
        </div>
        
        <div class="content">
            <p>Hello Admin,</p>
            <p>A new admission application has been submitted to GAYATRI JUNIOR & DEGREE COLLEGE. Review the details below:</p>
            
            <div class="field">
                <span class="label">Student Name:</span>
                {{student_name}}
            </div>
            
            <div class="field">
                <span class="label">Parent/Guardian:</span>
                {{parent_name}}
            </div>
            
            <div class="field">
                <span class="label">Parent Email:</span>
                {{parent_email}}
            </div>
            
            <div class="field">
                <span class="label">Class Applying For:</span>
                {{class_applying}}
            </div>
            
            <div class="field">
                <span class="label">Application ID:</span>
                <strong>{{application_id}}</strong>
            </div>

            <h3>Full Application Details:</h3>
            <pre style="background-color: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 3px; overflow-x: auto; white-space: pre-wrap; word-wrap: break-word;">{{email_body}}</pre>
            
            <a href="https://yourwebsite.com/dashboard.html" class="button">Review in Admin Dashboard</a>
            
            <div class="footer">
                <p>This is an automated notification. Please log into your admin dashboard to take action.</p>
            </div>
        </div>
    </div>
</body>
</html>
```

---

## Template 2: Student Confirmation Template

**Template Name:** `template_student_confirmation`

**Template Settings:**
- **To Email:** `{{to_email}}`
- **Subject:** `Application Received - Your ID: {{application_id}} | GAYATRI JUNIOR & DEGREE COLLEGE`

**HTML Content:**

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.8; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; }
        .email-wrapper { background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 30px 20px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; }
        .content { padding: 30px 20px; }
        .greeting { font-size: 16px; margin-bottom: 20px; }
        .application-id { background-color: #eff6ff; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; border-radius: 3px; }
        .application-id .label { font-size: 12px; color: #2563eb; font-weight: bold; text-transform: uppercase; }
        .application-id .id-value { font-size: 24px; color: #1d4ed8; font-weight: bold; margin-top: 5px; font-family: 'Courier New', monospace; }
        .details { background-color: #fafafa; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .detail-row { display: flex; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { font-weight: bold; width: 40%; color: #2563eb; }
        .detail-value { width: 60%; color: #666; }
        .next-steps { background-color: #f0fdf4; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #22c55e; }
        .next-steps h3 { color: #15803d; margin-top: 0; }
        .next-steps ol { color: #166534; padding-left: 20px; }
        .next-steps li { margin-bottom: 8px; }
        .button { background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
        .button:hover { background-color: #1d4ed8; }
        .footer { color: #999; font-size: 12px; text-align: center; padding: 20px; border-top: 1px solid #eee; margin-top: 20px; }
        .footer p { margin: 5px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="email-wrapper">
            <div class="header">
                <h1>Application Received!</h1>
                <p>GAYATRI JUNIOR & DEGREE COLLEGE</p>
            </div>
            
            <div class="content">
                <div class="greeting">
                    Dear {{parent_name}},
                </div>
                
                <p>Thank you for submitting the admission application for <strong>{{student_name}}</strong> to GAYATRI JUNIOR & DEGREE COLLEGE.</p>
                
                <p style="font-weight: bold; color: #15803d;">✓ Your application has been successfully received!</p>
                
                <div class="application-id">
                    <div class="label">Your Application ID</div>
                    <div class="id-value">{{application_id}}</div>
                    <p style="margin: 10px 0 0 0; color: #2563eb; font-size: 12px;">Keep this ID safe for future reference</p>
                </div>
                
                <div class="details">
                    <div class="detail-row">
                        <div class="detail-label">Student Name:</div>
                        <div class="detail-value">{{student_name}}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Applying For:</div>
                        <div class="detail-value">{{class_applying}}</div>
                    </div>
                </div>
                
                <div class="next-steps">
                    <h3>What Happens Next?</h3>
                    <ol>
                        <li>Our administrative team will review your application and documents</li>
                        <li>We will conduct a preliminary assessment within 5-7 business days</li>
                        <li>You will receive an email notification with the admission decision</li>
                        <li>If approved, you'll receive further instructions for document verification</li>
                    </ol>
                </div>
                
                <p>You can track the status of your application anytime:</p>
                <a href="{{status_link}}" class="button">Check Application Status</a>
                
                <p style="color: #666; font-size: 14px; margin-top: 20px;">If you have any questions, please contact our admissions office at <strong>admissions@gayatricollege.edu</strong></p>
                
                <div class="footer">
                    <p><strong>GAYATRI JUNIOR & DEGREE COLLEGE</strong></p>
                    <p>Admission Office</p>
                    <p>This is an automated email. Please do not reply directly.</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
```

---

## Template 3: Status Update Template

**Template Name:** `template_status_update`

**Template Settings:**
- **To Email:** `{{to_email}}`
- **Subject:** `{{subject}}`

**HTML Content:**

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.8; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5; }
        .email-wrapper { background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
        .header { padding: 30px 20px; text-align: center; color: white; }
        .header.approved { background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); }
        .header.rejected { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
        .header.pending { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); }
        .header h1 { margin: 0; font-size: 24px; }
        .header p { margin: 10px 0 0 0; opacity: 0.9; }
        .content { padding: 30px 20px; }
        .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 15px 0; }
        .status-badge.approved { background-color: #d1fae5; color: #065f46; }
        .status-badge.rejected { background-color: #fee2e2; color: #7f1d1d; }
        .status-badge.pending { background-color: #fef3c7; color: #78350f; }
        .details { background-color: #fafafa; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .detail-row { display: flex; padding: 8px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { font-weight: bold; width: 40%; color: #2563eb; }
        .detail-value { width: 60%; color: #666; }
        .action-box { background-color: #eff6ff; padding: 20px; border-radius: 5px; border-left: 4px solid #2563eb; margin: 20px 0; }
        .action-box.approved { background-color: #d1fae5; border-left-color: #22c55e; }
        .action-box.rejected { background-color: #fee2e2; border-left-color: #ef4444; }
        .button { background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 15px 0; }
        .button.approved { background-color: #22c55e; }
        .button.approved:hover { background-color: #16a34a; }
        .button.rejected { background-color: #ef4444; }
        .required-docs { list-style: none; padding: 0; }
        .required-docs li { padding: 8px 0; padding-left: 25px; position: relative; }
        .required-docs li:before { content: "✓"; position: absolute; left: 0; font-weight: bold; color: #22c55e; }
        .footer { color: #999; font-size: 12px; text-align: center; padding: 20px; border-top: 1px solid #eee; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="email-wrapper">
            <div class="header {{status}}">
                <h1>Application Status Update</h1>
                <p>Application ID: {{application_id}}</p>
            </div>
            
            <div class="content">
                <p>Dear {{parent_name}},</p>
                
                <div style="text-align: center;">
                    <span class="status-badge {{status}}">Status: {{status}}</span>
                </div>
                
                <div class="details">
                    <div class="detail-row">
                        <div class="detail-label">Student Name:</div>
                        <div class="detail-value">{{student_name}}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Applied For:</div>
                        <div class="detail-value">{{class_applying}}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Application ID:</div>
                        <div class="detail-value"><strong>{{application_id}}</strong></div>
                    </div>
                </div>

                <!-- APPROVED STATUS -->
                <div id="approved-content" style="display: none;">
                    <div class="action-box approved">
                        <h3 style="margin-top: 0; color: #15803d;">🎉 Congratulations! Your Admission is Confirmed!</h3>
                        <p>We are delighted to inform you that your application has been APPROVED for admission to {{class_applying}} at GAYATRI JUNIOR & DEGREE COLLEGE.</p>
                    </div>
                    
                    <h3 style="color: #15803d;">Next Steps (Important):</h3>
                    <ol>
                        <li><strong>Visit the school office within 7 business days</strong> to complete physical document verification</li>
                        <li>Bring your original documents and pay the admission fees</li>
                        <li>Complete the enrollment registration</li>
                        <li>Receive your admission confirmation</li>
                    </ol>
                    
                    <h3>Required Documents:</h3>
                    <ul class="required-docs">
                        <li>Original Birth Certificate of student</li>
                        <li>Previous school's academic report card (original)</li>
                        <li>3 passport-sized color photographs</li>
                        <li>Printout of this email/application confirmation</li>
                        <li>Valid ID proof of parent/guardian</li>
                    </ul>
                    
                    <p style="font-weight: bold; color: #15803d; margin-top: 20px;">Welcome to the Gayatri Family! 🎓</p>
                </div>

                <!-- REJECTED STATUS -->
                <div id="rejected-content" style="display: none;">
                    <div class="action-box rejected">
                        <h3 style="margin-top: 0; color: #7f1d1d;">Application Status</h3>
                        <p>Thank you for your interest in GAYATRI JUNIOR & DEGREE COLLEGE. After careful review of your application for {{class_applying}}, we regret to inform you that we are unable to offer admission for this academic year due to limited class capacity and high competition.</p>
                    </div>
                    
                    <p>We appreciate your interest and wish {{student_name}} the very best in their academic endeavors. We hope to welcome you in future admissions cycles.</p>
                </div>

                <!-- PENDING STATUS -->
                <div id="pending-content" style="display: none;">
                    <div class="action-box pending">
                        <h3 style="margin-top: 0; color: #78350f;">Your Application is Under Review</h3>
                        <p>Your application has been updated to PENDING status and is currently under review by our admissions team.</p>
                    </div>
                    
                    <p>We will notify you via email as soon as a final determination is made. This typically takes 5-7 business days.</p>
                    
                    <p>You can check the status anytime:</p>
                    <a href="https://yourwebsite.com/status.html?id={{application_id}}" class="button">Check Status</a>
                </div>
                
                <p style="color: #666; font-size: 14px; margin-top: 30px;">For any questions, contact our admissions office: <strong>admissions@gayatricollege.edu</strong></p>
                
                <div class="footer">
                    <p><strong>GAYATRI JUNIOR & DEGREE COLLEGE</strong></p>
                    <p>Office of Admissions</p>
                    <p>This is an automated email. Please do not reply directly.</p>
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Show appropriate content based on status
        var status = '{{status}}'.toLowerCase();
        if (status === 'approved') {
            document.getElementById('approved-content').style.display = 'block';
        } else if (status === 'rejected') {
            document.getElementById('rejected-content').style.display = 'block';
        } else {
            document.getElementById('pending-content').style.display = 'block';
        }
    </script>
</body>
</html>
```

---

## How to Create Templates in EmailJS

1. **Log in** to your EmailJS dashboard
2. Go to **Email Templates** (left sidebar)
3. Click **Create New Template**
4. Set the template name exactly as shown above
5. Set the **To Email** field to: `{{to_email}}`
6. Set the **Subject** field to the subject shown above
7. Paste the HTML content into the template editor
8. Make sure all template variables (like `{{student_name}}`, `{{application_id}}`, etc.) are present in your HTML
9. Click **Save**
10. Copy the **Template ID** and keep it handy

**Important:** Make sure the **Template IDs** in your `js/email-config.js` match exactly with the template names you create:
- `template_admin_notification`
- `template_student_confirmation`
- `template_status_update`

---

## Summary

| Template | Purpose | Recipient | Trigger |
|----------|---------|-----------|---------|
| `template_admin_notification` | Alerts admin of new submission | Admin (gayatricollege02245@gmail.com) | Student submits form |
| `template_student_confirmation` | Confirms receipt to student | Student (form email field) | Student submits form |
| `template_status_update` | Notifies of decision | Student (form email field) | Admin approves/rejects |

All templates use EmailJS variables which are automatically replaced with actual values when emails are sent.

