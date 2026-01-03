// Email sending utility (stub)
const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail');

module.exports = {
  // Send email (stub)
  sendMail: async ({ to, subject, text, html }) => {
    // TODO: Configure real transporter and implement
    const transporter = nodemailer.createTransport({
      service: mailConfig.service,
      auth: {
        user: mailConfig.user,
        pass: mailConfig.pass,
      },
    });
    // For now, just log
    console.log('Sending email to', to, subject);
    // Actually send the email
    await transporter.sendMail({ from: mailConfig.user, to, subject, text, html });
    return true;
  },
};
