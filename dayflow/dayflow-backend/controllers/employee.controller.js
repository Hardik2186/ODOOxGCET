// Handles employee profile CRUD
const Employee = require('../models/Employee');
const User = require('../models/User');

// Get own profile
exports.getProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id }).populate('user');
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update own profile (limited fields)
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const employee = await Employee.findOneAndUpdate({ user: req.user.id }, updates, { new: true });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: update any employee
exports.adminUpdateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const employee = await Employee.findByIdAndUpdate(id, updates, { new: true });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: list all employees
exports.listEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('user');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
