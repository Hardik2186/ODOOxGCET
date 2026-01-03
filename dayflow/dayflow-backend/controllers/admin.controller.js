// Handles admin-specific actions
const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const mailer = require('../utils/mailer');

// Admin dashboard summary (stub)
exports.dashboard = async (req, res) => {
  // TODO: Aggregate employee, attendance, leave, payroll data
  res.json({ message: 'Admin dashboard summary (stub)' });
};

// Admin: Create a new employee (user + employee profile)
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password, role = 'employee', salary } = req.body;
    if (!email || !password || !name) return res.status(400).json({ message: 'name, email and password are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const employeeId = 'EMP' + Date.now().toString().slice(-6);
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ employeeId, email, password: hash, role });

    const employee = await Employee.create({
      user: user._id,
      personalDetails: { name },
      jobDetails: { salary: salary || 0 },
      documents: [],
    });

    // Optionally send welcome email (non-blocking). Use .catch to avoid unhandled promise rejections.
    mailer.sendMail({
      to: email,
      subject: 'Welcome to the company',
      text: `Your account has been created. Email: ${email} Password: ${password}`
    }).catch(e => {
      console.warn('Failed to send welcome email:', e && e.message ? e.message : e);
    });

    res.status(201).json({ user: { id: user._id, email: user.email, role: user.role, employeeId: user.employeeId }, employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
