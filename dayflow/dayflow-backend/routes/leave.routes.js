const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leave.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

// Employee: apply for leave, view own leaves
router.post('/', auth, role(['employee', 'admin', 'hr']), leaveController.applyLeave);
router.get('/me', auth, role(['employee', 'admin', 'hr']), leaveController.viewOwnLeaves);

// Admin: view all, approve, reject
router.get('/', auth, role(['admin', 'hr']), leaveController.adminViewAllLeaves);
router.put('/:id/approve', auth, role(['admin', 'hr']), leaveController.adminApproveLeave);
router.put('/:id/reject', auth, role(['admin', 'hr']), leaveController.adminRejectLeave);
module.exports = router;
