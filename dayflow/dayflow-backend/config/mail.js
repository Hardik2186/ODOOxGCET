// Email config (used by utils/mailer.js)
// For Gmail, prefer using an App Password (not your regular account password) or OAuth2.
// Example .env entries:
// MAIL_SERVICE=gmail
// MAIL_USER=your-email@gmail.com
// MAIL_PASS=your-app-password
// If MAIL_USER / MAIL_PASS are not provided, the mailer will fall back to an Ethereal test SMTP account (development only).
module.exports = {
  service: process.env.MAIL_SERVICE || 'gmail',
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
};
