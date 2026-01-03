const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendance.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

// Employee: check-in, check-out, view own attendance
router.post('/check-in', auth, role(['employee', 'admin', 'hr']), attendanceController.checkIn);
router.post('/check-out', auth, role(['employee', 'admin', 'hr']), attendanceController.checkOut);
router.get('/me', auth, role(['employee', 'admin', 'hr']), attendanceController.viewOwnAttendance);

// Admin: view all attendance
router.get('/', auth, role(['admin', 'hr']), attendanceController.adminViewAllAttendance);
module.exports = router;
