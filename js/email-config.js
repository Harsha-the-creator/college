/**
 * Email Configuration
 * Update these values with your EmailJS credentials
 */

const EMAIL_CONFIG = {
  // Get from EmailJS Account settings
  PUBLIC_KEY: 'E_8b6VCPdtHzYjvPP',  // Replace with your EmailJS Public Key
  
  // Get from EmailJS Email Services
  SERVICE_ID: 'service_gayatri_admin',  // Replace with your Service ID
  
  // Get from EmailJS Email Templates  
  TEMPLATE_ID: 'template_admin_notification',  // Replace with your Template ID
  
  // Admin email address where notifications will be sent
  ADMIN_EMAIL: 'gayatricollege02245@gmail.com'
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EMAIL_CONFIG;
}
