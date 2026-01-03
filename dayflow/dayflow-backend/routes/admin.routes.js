const express = require('express');
const router = express.Router();
const mailer = require('../utils/mailer');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const adminController = require('../controllers/admin.controller');

// Admin dashboard summary
router.get('/dashboard', auth, role(['admin', 'hr']), adminController.dashboard);

// Test email route
router.post('/send-test-mail', auth, role(['admin', 'hr']), async (req, res) => {
  try {
    await mailer.sendMail({
      to: req.body.to, // recipient email
      subject: req.body.subject || 'Test Email',
      text: req.body.text || 'This is a test email from Dayflow HRMS.'
    });
    res.json({ message: 'Email sent!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
