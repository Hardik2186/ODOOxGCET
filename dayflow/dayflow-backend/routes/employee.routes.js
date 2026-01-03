const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const upload = require('../middleware/upload.middleware');

// Employee: get and update own profile
router.get('/me', auth, role(['employee', 'admin', 'hr']), employeeController.getProfile);
router.put('/me', auth, role(['employee', 'admin', 'hr']), employeeController.updateProfile);
router.post('/me/photo', auth, role(['employee', 'admin', 'hr']), upload.single('photo'), employeeController.uploadProfilePhoto);

// Backwards compatibility: legacy `/profile` endpoints
router.get('/profile', auth, role(['employee', 'admin', 'hr']), employeeController.getProfile);
router.put('/profile', auth, role(['employee', 'admin', 'hr']), employeeController.updateProfile);
router.post('/profile/photo', auth, role(['employee', 'admin', 'hr']), upload.single('photo'), employeeController.uploadProfilePhoto);

// Admin: update any employee, list all
router.put('/:id', auth, role(['admin', 'hr']), employeeController.adminUpdateEmployee);
router.get('/', auth, role(['admin', 'hr']), employeeController.listEmployees);
module.exports = router;
