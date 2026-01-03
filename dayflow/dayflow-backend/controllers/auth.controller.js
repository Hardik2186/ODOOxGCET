// Handles registration, login, email verification
const User = require('../models/User');
const Employee = require('../models/Employee');
const Company = require('../models/Company');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');

// Register new user (supports multipart/form-data with logo)
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

    // generate an employeeId if not provided
    let employeeId = req.body.employeeId;
    if (!employeeId) employeeId = 'EMP' + Date.now().toString().slice(-6);

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const role = req.body.role || 'admin';
    const user = await User.create({ employeeId, email, password: hash, role });

    // If company provided, create it (logo optional)
    let company = null;
    if (req.body.company) {
      const logoUrl = req.file ? `/uploads/${req.file.filename}` : undefined;
      company = await Company.create({ name: req.body.company, logoUrl, createdBy: user._id });
    }

    // Create Employee profile and associate company when present
    const employeeData = {
      user: user._id,
      personalDetails: { name: name || '', phone: phone || '' },
      jobDetails: {},
      documents: [],
    };
    if (company) employeeData.jobDetails.company = company._id;

    const employee = await Employee.create(employeeData);

    // add employee to company record
    if (company) {
      company.employees.push(employee._id);
      await company.save();
    }

    // Sign token and return user + company
    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn });
    const userSafe = { id: user._id, employeeId: user.employeeId, email: user.email, role: user.role };

    res.status(201).json({ token, user: userSafe, company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    // if (!user.isEmailVerified) return res.status(403).json({ message: 'Email not verified' });
    const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn });
    const userSafe = { id: user._id, employeeId: user.employeeId, email: user.email, role: user.role };
    res.json({ token, user: userSafe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Email verification (stub)
exports.verifyEmail = async (req, res) => {
  // TODO: Implement email verification logic
  res.json({ message: 'Email verified (stub)' });
};
