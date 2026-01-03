const express = require('express');
const router = express.Router();
const payrollController = require('../controllers/payroll.controller');
const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');

// Employee: view own payroll
router.get('/me', auth, role(['employee', 'admin', 'hr']), payrollController.viewOwnPayroll);

// Admin: view all payrolls, update payroll
router.get('/', auth, role(['admin', 'hr']), payrollController.adminViewAllPayroll);
router.put('/:id', auth, role(['admin', 'hr']), payrollController.adminUpdatePayroll);
module.exports = router;
