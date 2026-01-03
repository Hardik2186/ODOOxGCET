// Handles registration, login, email verification
const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('../config/jwt');

// Register new user
exports.register = async (req, res) => {
  try {
    const { employeeId, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ employeeId, email, password: hash, role });
    // Create Employee profile for the user
    await Employee.create({ user: user._id, personalDetails: {}, jobDetails: {}, documents: [] });
    // TODO: Send verification email
    res.status(201).json({ message: 'Registered. Please verify your email.' });
  } catch (err) {
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
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Email verification (stub)
exports.verifyEmail = async (req, res) => {
  // TODO: Implement email verification logic
  res.json({ message: 'Email verified (stub)' });
};
