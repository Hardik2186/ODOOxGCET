const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

// Admin dashboard summary
router.get('/dashboard', auth, role(['admin', 'hr']), adminController.dashboard);
module.exports = router;
