// Email sending utility (stub)
const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail');

module.exports = {
  // Send email (robust)
  sendMail: async ({ to, subject, text, html }) => {
    try {
      // If SMTP credentials are provided, use them. Otherwise create a test account (Ethereal) for dev.
      let transporter;
      if (mailConfig.user && mailConfig.pass) {
        transporter = nodemailer.createTransport({
          service: mailConfig.service,
          auth: {
            user: mailConfig.user,
            pass: mailConfig.pass,
          },
        });
      } else {
        console.warn('MAIL_USER or MAIL_PASS not set — falling back to Ethereal test account for email preview. Set MAIL_USER and MAIL_PASS in .env for real emails.');
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
      }

      console.log('Sending email to', to, subject);
      const info = await transporter.sendMail({ from: mailConfig.user || undefined, to, subject, text, html });

      // If using Ethereal, print preview URL to console
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        console.log('Email preview URL:', previewUrl);
      }

      return true;
    } catch (err) {
      // Log but don't throw — email failures should not crash the app
      console.error('Failed to send email to', to, '-', err && err.message ? err.message : err);
      return false;
    }
  },
};
