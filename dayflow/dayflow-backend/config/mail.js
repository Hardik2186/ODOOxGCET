// Email config (stub for alerts, salary slips)
module.exports = {
  service: process.env.MAIL_SERVICE || 'gmail',
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
};
