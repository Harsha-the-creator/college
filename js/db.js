/**
 * School Admission Management System - Database Layer (LocalStorage)
 */

const DB_KEY = 'admissions_applications';
const TOPPERS_KEY = 'homepage_toppers';
const EMAIL_LOG_KEY = 'admissions_emails';
const MESSAGES_LOG_KEY = 'contact_messages';

// Seed data to make the admin dashboard look authentic immediately
const SEED_APPLICATIONS = [
  {
    id: 'ADM-2026-3941',
    studentName: 'Alex Mercer',
    dob: '2016-04-12',
    gender: 'Male',
    parentName: 'Sarah Mercer',
    parentPhone: '555-0199',
    email: 'sarah.mercer@example.com',
    address: '742 Evergreen Terrace, Springfield',
    classApplying: 'Grade 5',
    prevSchool: 'Springfield Elementary School',
    docName: 'alex_grade4_report.pdf',
    docType: 'application/pdf',
    docSize: 1048576, // 1MB
    status: 'pending',
    createdAt: '2026-06-15T09:30:00.000Z',
    updatedAt: '2026-06-15T09:30:00.000Z'
  },
  {
    id: 'ADM-2026-8812',
    studentName: 'Sophia Lin',
    dob: '2012-09-23',
    gender: 'Female',
    parentName: 'David Lin',
    parentPhone: '555-0144',
    email: 'd.lin@example.com',
    address: '128 Orchard Road, Metro City',
    classApplying: 'Grade 9',
    prevSchool: 'Oakridge Middle School',
    docName: 'sophia_transfer_cert.jpg',
    docType: 'image/jpeg',
    docSize: 2097152, // 2MB
    status: 'approved',
    createdAt: '2026-06-14T14:15:00.000Z',
    updatedAt: '2026-06-15T10:00:00.000Z'
  },
  {
    id: 'ADM-2026-4731',
    studentName: 'Marcus Aurelius',
    dob: '2010-02-15',
    gender: 'Male',
    parentName: 'Antoninus Pius',
    parentPhone: '555-0172',
    email: 'a.pius@example.com',
    address: 'Villa of the Antonines, Rome',
    classApplying: 'Grade 11',
    prevSchool: 'Imperial Academy of Athens',
    docName: 'philosophy_grades.pdf',
    docType: 'application/pdf',
    docSize: 524288, // 512KB
    status: 'rejected',
    createdAt: '2026-06-12T11:05:00.000Z',
    updatedAt: '2026-06-13T16:45:00.000Z'
  },
  {
    id: 'ADM-2026-1925',
    studentName: 'Emma Watson',
    dob: '2018-07-04',
    gender: 'Female',
    parentName: 'Chris Watson',
    parentPhone: '555-0185',
    email: 'c.watson@example.com',
    address: '4 Privet Drive, Little Whinging',
    classApplying: 'Grade 3',
    prevSchool: 'Hogwarts Preparatory Nursery',
    docName: 'birth_cert_emma.png',
    docType: 'image/png',
    docSize: 819200, // 800KB
    status: 'pending',
    createdAt: '2026-06-16T08:12:00.000Z',
    updatedAt: '2026-06-16T08:12:00.000Z'
  }
];

// Initialize DB if not present
function initDb() {
  if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(SEED_APPLICATIONS));
  }
  if (!localStorage.getItem(EMAIL_LOG_KEY)) {
    localStorage.setItem(EMAIL_LOG_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(MESSAGES_LOG_KEY)) {
    localStorage.setItem(MESSAGES_LOG_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(TOPPERS_KEY)) {
    localStorage.setItem(TOPPERS_KEY, JSON.stringify([]));
  }
}

// Get all applications
function getApplications() {
  initDb();
  return JSON.parse(localStorage.getItem(DB_KEY)) || [];
}

// Get topper highlight entries for homepage
function getToppers() {
  initDb();
  return JSON.parse(localStorage.getItem(TOPPERS_KEY)) || [];
}

function getTopperById(id) {
  const list = getToppers();
  return list.find(topper => topper.id === id) || null;
}

function createTopper(entry) {
  const list = getToppers();
  const newTopper = {
    id: 'TOP-' + Math.floor(100000 + Math.random() * 900000),
    name: entry.name,
    class: entry.class,
    marks: entry.marks,
    image: entry.image,
    createdAt: new Date().toISOString()
  };
  list.unshift(newTopper);
  localStorage.setItem(TOPPERS_KEY, JSON.stringify(list));
  return newTopper;
}

function deleteTopper(id) {
  let list = getToppers();
  list = list.filter(topper => topper.id !== id);
  localStorage.setItem(TOPPERS_KEY, JSON.stringify(list));
  return list;
}

function clearToppers() {
  localStorage.setItem(TOPPERS_KEY, JSON.stringify([]));
}

// Get single application by ID
function getApplicationById(id) {
  const list = getApplications();
  return list.find(app => app.id.toUpperCase() === id.trim().toUpperCase()) || null;
}

// Generate Unique Application ID (ADM-2026-XXXX)
function generateUniqueId() {
  const list = getApplications();
  const currentYear = new Date().getFullYear();
  let uniqueId = '';
  let isUnique = false;

  while (!isUnique) {
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4 digit random number
    uniqueId = `ADM-${currentYear}-${randomDigits}`;
    
    // Check collision
    isUnique = !list.some(app => app.id === uniqueId);
  }
  return uniqueId;
}

// Create new application
function createApplication(appData) {
  const list = getApplications();
  const newId = generateUniqueId();
  
  const newApp = {
    id: newId,
    studentName: appData.studentName,
    dob: appData.dob,
    gender: appData.gender,
    parentName: appData.parentName,
    parentPhone: appData.parentPhone,
    email: appData.email,
    address: appData.address,
    classApplying: appData.classApplying,
    prevSchool: appData.prevSchool || 'N/A',
    docName: appData.docName || 'not_uploaded.pdf',
    docType: appData.docType || 'application/pdf',
    docSize: appData.docSize || 0,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  list.push(newApp);
  localStorage.setItem(DB_KEY, JSON.stringify(list));

  // Log email notification simulation
  logSimulatedEmail(
    newApp.email,
    'Admission Application Submitted - GAYATRI JUNIOR & DEGREE COLLEGE',
    `Dear ${newApp.parentName},\n\nThank you for applying to GAYATRI JUNIOR & DEGREE COLLEGE. We have successfully received the application for ${newApp.studentName}.\n\nYour Unique Application ID is: **${newApp.id}**.\nYou can check the real-time status of your application here: ${window.location.origin}/status.html?id=${newApp.id}\n\nOur administrative team will review the submitted information and uploaded documents. We will notify you once a decision has been reached.\n\nBest regards,\nAdmission Office\nGAYATRI JUNIOR & DEGREE COLLEGE`
  );

  // Send confirmation email to student
  sendStudentConfirmationEmail(newApp);

  // Send email notification to admin
  sendAdminNotificationEmail(newApp);

  return newApp;
}

// Update application status (approve / reject)
function updateApplicationStatus(id, newStatus) {
  const list = getApplications();
  const index = list.findIndex(app => app.id === id);
  
  if (index === -1) return null;

  list[index].status = newStatus;
  list[index].updatedAt = new Date().toISOString();
  
  localStorage.setItem(DB_KEY, JSON.stringify(list));
  
  const updatedApp = list[index];

  // Send status email update notification
  let emailSubject = `Application Status Update: ${updatedApp.id}`;
  let emailBody = '';
  
  if (newStatus === 'approved') {
    emailBody = `Dear ${updatedApp.parentName},\n\nWe are absolutely delighted to inform you that the application for **${updatedApp.studentName}** (ID: ${updatedApp.id}) has been **APPROVED** for admission to ${updatedApp.classApplying} at GAYATRI JUNIOR & DEGREE COLLEGE.\n\nPlease visit the school administration office within the next 7 business days to complete the physical verification of documents and pay the admission fees.\n\nRequired Documents:\n- Printout of Application PDF (attached/available on status page)\n- Original Birth Certificate of student\n- Original academic report card of the previous school\n- 3 passport-sized color photographs\n\nCongratulations and welcome to the Gayatri Family!\n\nBest regards,\nOffice of Admissions\nGAYATRI JUNIOR & DEGREE COLLEGE`;
  } else if (newStatus === 'rejected') {
    emailBody = `Dear ${updatedApp.parentName},\n\nThank you for your interest in GAYATRI JUNIOR & DEGREE COLLEGE. We have completed the review of the admission application for **${updatedApp.studentName}** (ID: ${updatedApp.id}) for admission to ${updatedApp.classApplying}.\n\nAfter careful consideration of all applications and our current class capacity limits, we regret to inform you that we are unable to offer admission for this academic year. We wish your child the absolute best in their future academic endeavors.\n\nBest regards,\nOffice of Admissions\nGAYATRI JUNIOR & DEGREE COLLEGE`;
  } else {
    emailBody = `Dear ${updatedApp.parentName},\n\nThe status of the application for **${updatedApp.studentName}** (ID: ${updatedApp.id}) has been updated back to **PENDING / UNDER REVIEW**.\n\nWe will notify you immediately once a final determination is made.\n\nBest regards,\nOffice of Admissions\nGAYATRI JUNIOR & DEGREE COLLEGE`;
  }

  // Log simulated email for admin review
  logSimulatedEmail(updatedApp.email, emailSubject, emailBody);

  // Send actual status update email to student
  sendStudentStatusUpdateEmail(updatedApp, newStatus);

  return updatedApp;
}

// Clear all application records
function clearApplications() {
  localStorage.setItem(DB_KEY, JSON.stringify([]));
}

// Simulate Email log helper
function logSimulatedEmail(to, subject, body) {
  const emails = JSON.parse(localStorage.getItem(EMAIL_LOG_KEY)) || [];
  const newEmail = {
    id: 'EMAIL-' + Math.floor(100000 + Math.random() * 900000),
    to: to,
    subject: subject,
    body: body,
    sentAt: new Date().toISOString()
  };
  emails.unshift(newEmail); // Keep newest first
  localStorage.setItem(EMAIL_LOG_KEY, JSON.stringify(emails));
  
  // Also log to console for debugging purposes
  console.log(`%c[SIMULATED EMAIL SENT] To: ${to}\nSubject: ${subject}\n\n${body}`, 'background: #eff6ff; color: #1e40af; padding: 10px; border-left: 4px solid #2563eb;');
}

// Get all email logs (for admin review)
function getEmailLogs() {
  initDb();
  return JSON.parse(localStorage.getItem(EMAIL_LOG_KEY)) || [];
}

// Create a new contact message
function createContactMessage(messageData) {
  const messages = JSON.parse(localStorage.getItem(MESSAGES_LOG_KEY)) || [];
  const newMessage = {
    id: 'MSG-' + Math.floor(100000 + Math.random() * 900000),
    name: messageData.name,
    email: messageData.email,
    subject: messageData.subject,
    message: messageData.message,
    createdAt: new Date().toISOString(),
    status: 'unread'
  };

  messages.unshift(newMessage); // Keep newest first
  localStorage.setItem(MESSAGES_LOG_KEY, JSON.stringify(messages));
  
  console.log(`%c[NEW CONTACT MESSAGE] From: ${newMessage.name} (${newMessage.email})\nSubject: ${newMessage.subject}\n\n${newMessage.message}`, 'background: #f0fdf4; color: #166534; padding: 10px; border-left: 4px solid #22c55e;');
  
  return newMessage;
}

// Get all contact messages
function getContactMessages() {
  initDb();
  return JSON.parse(localStorage.getItem(MESSAGES_LOG_KEY)) || [];
}

// Mark message as read
function markMessageAsRead(messageId) {
  const messages = JSON.parse(localStorage.getItem(MESSAGES_LOG_KEY)) || [];
  const message = messages.find(m => m.id === messageId);
  
  if (message) {
    message.status = 'read';
    localStorage.setItem(MESSAGES_LOG_KEY, JSON.stringify(messages));
  }
  
  return message;
}

// Send email notification to admin when application is submitted
async function sendAdminNotificationEmail(appData) {
  try {
    // Check if EmailJS is available and EMAIL_CONFIG is defined
    if (typeof emailjs === 'undefined' || typeof EMAIL_CONFIG === 'undefined') {
      console.warn('[EMAIL] EmailJS or EMAIL_CONFIG not configured');
      return false;
    }

    // Get config values
    const adminEmail = EMAIL_CONFIG.ADMIN_EMAIL;
    const serviceId = EMAIL_CONFIG.SERVICE_ID;
    const templateId = EMAIL_CONFIG.TEMPLATE_ID;
    
      // Format the email body with all application details
      const emailBody = `
NEW APPLICATION SUBMISSION

Student Name: ${appData.studentName}
Date of Birth: ${appData.dob}
Gender: ${appData.gender}

Parent/Guardian Name: ${appData.parentName}
Parent Phone: ${appData.parentPhone}
Parent Email: ${appData.email}
Address: ${appData.address}

Class Applying For: ${appData.classApplying}
Previous School: ${appData.prevSchool || 'N/A'}

Document Uploaded: ${appData.docName}
Document Type: ${appData.docType}
Document Size: ${(appData.docSize / 1024 / 1024).toFixed(2)} MB

Application ID: ${appData.id}
Submitted At: ${new Date().toLocaleString()}

---
Please log in to the admin dashboard to review and process this application.
      `.trim();

      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: adminEmail,
          student_name: appData.studentName,
          parent_name: appData.parentName,
          parent_email: appData.email,
          class_applying: appData.classApplying,
          application_id: appData.id,
          email_body: emailBody
        }
      );

      console.log('%c[ADMIN EMAIL SENT] Email notification sent to ' + adminEmail, 
        'background: #dcfce7; color: #166534; padding: 10px; border-left: 4px solid #22c55e;');
      return true;
  } catch (error) {
    console.error('Failed to send admin notification email:', error);
    // Continue anyway - don't block application submission if email fails
    return false;
  }
}

// Send confirmation email to student when application is submitted
async function sendStudentConfirmationEmail(appData) {
  try {
    if (typeof emailjs === 'undefined' || typeof EMAIL_CONFIG === 'undefined') {
      console.warn('[EMAIL] EmailJS or EMAIL_CONFIG not configured');
      return false;
    }

    const serviceId = EMAIL_CONFIG.SERVICE_ID;
    const studentEmail = appData.email;
    
    const emailBody = `Dear ${appData.parentName},

Thank you for applying to GAYATRI JUNIOR & DEGREE COLLEGE. We have successfully received the application for ${appData.studentName}.

Your Unique Application ID is: ${appData.id}

Application Details:
- Student Name: ${appData.studentName}
- Class Applying For: ${appData.classApplying}
- Date of Birth: ${appData.dob}

You can track the status of your application here:
${window.location.origin}/status.html?id=${appData.id}

Our administrative team will review the submitted information and uploaded documents. We will notify you once a decision has been reached.

Best regards,
Admission Office
GAYATRI JUNIOR & DEGREE COLLEGE`;

    const response = await emailjs.send(
      serviceId,
      'template_student_confirmation',
      {
        to_email: studentEmail,
        student_name: appData.studentName,
        parent_name: appData.parentName,
        application_id: appData.id,
        class_applying: appData.classApplying,
        status_link: `${window.location.origin}/status.html?id=${appData.id}`,
        email_body: emailBody
      }
    );

    console.log(`%c[STUDENT EMAIL SENT] Confirmation sent to ${studentEmail}`, 
      'background: #dcfce7; color: #166534; padding: 10px; border-left: 4px solid #22c55e;');
    return true;
  } catch (error) {
    console.error('Failed to send student confirmation email:', error);
    return false;
  }
}

// Send status update email to student when admin updates application status
async function sendStudentStatusUpdateEmail(appData, newStatus) {
  try {
    if (typeof emailjs === 'undefined' || typeof EMAIL_CONFIG === 'undefined') {
      console.warn('[EMAIL] EmailJS or EMAIL_CONFIG not configured');
      return false;
    }

    const serviceId = EMAIL_CONFIG.SERVICE_ID;
    const studentEmail = appData.email;
    let emailSubject = '';
    let emailBody = '';

    if (newStatus === 'approved') {
      emailSubject = `Congratulations! Your Admission is Confirmed - ${appData.id}`;
      emailBody = `Dear ${appData.parentName},

We are delighted to inform you that the application for ${appData.studentName} has been APPROVED for admission to ${appData.classApplying} at GAYATRI JUNIOR & DEGREE COLLEGE.

Application ID: ${appData.id}

Next Steps:
1. Visit the school administration office within the next 7 business days
2. Complete the physical verification of documents
3. Pay the admission fees

Required Documents:
- Original Birth Certificate
- Previous school's academic report card
- 3 passport-sized color photographs
- Printout of application confirmation

Congratulations and welcome to the Gayatri Family!

Best regards,
Office of Admissions
GAYATRI JUNIOR & DEGREE COLLEGE`;
    } else if (newStatus === 'rejected') {
      emailSubject = `Application Status Update - ${appData.id}`;
      emailBody = `Dear ${appData.parentName},

Thank you for your interest in GAYATRI JUNIOR & DEGREE COLLEGE. We have completed the review of the admission application for ${appData.studentName} for admission to ${appData.classApplying}.

After careful consideration of all applications and our current class capacity limits, we regret to inform you that we are unable to offer admission for this academic year.

Application ID: ${appData.id}

We wish your child the absolute best in their future academic endeavors.

Best regards,
Office of Admissions
GAYATRI JUNIOR & DEGREE COLLEGE`;
    } else {
      emailSubject = `Application Status Update - ${appData.id}`;
      emailBody = `Dear ${appData.parentName},

The status of the application for ${appData.studentName} (ID: ${appData.id}) has been updated to PENDING for further review.

We will notify you immediately once a final determination is made.

You can track the status here:
${window.location.origin}/status.html?id=${appData.id}

Best regards,
Office of Admissions
GAYATRI JUNIOR & DEGREE COLLEGE`;
    }

    const response = await emailjs.send(
      serviceId,
      'template_status_update',
      {
        to_email: studentEmail,
        student_name: appData.studentName,
        parent_name: appData.parentName,
        application_id: appData.id,
        class_applying: appData.classApplying,
        status: newStatus.toUpperCase(),
        subject: emailSubject,
        email_body: emailBody
      }
    );

    console.log(`%c[STUDENT STATUS EMAIL SENT] Status update (${newStatus}) sent to ${studentEmail}`, 
      'background: #dcfce7; color: #166534; padding: 10px; border-left: 4px solid #22c55e;');
    return true;
  } catch (error) {
    console.error('Failed to send student status update email:', error);
    return false;
  }
}

// Export database operations globally
window.DB = {
  getApplications,
  getApplicationById,
  getToppers,
  getTopperById,
  createTopper,
  deleteTopper,
  clearToppers,
  createApplication,
  updateApplicationStatus,
  clearApplications,
  getEmailLogs,
  createContactMessage,
  getContactMessages,
  markMessageAsRead,
  sendAdminNotificationEmail,
  sendStudentConfirmationEmail,
  sendStudentStatusUpdateEmail
};

// Auto-run init on script load
initDb();

