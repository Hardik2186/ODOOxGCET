// Handles employee profile CRUD
const Employee = require('../models/Employee');
const User = require('../models/User');

// Get own profile (flattened for frontend convenience)
exports.getProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id }).populate('user');
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    const payload = {
      id: employee._id,
      name: employee.personalDetails?.name || '',
      phone: employee.personalDetails?.phone || '',
      address: employee.personalDetails?.address || '',
      profilePhoto: employee.personalDetails?.profilePicture || null,
      email: employee.user?.email || '',
      employeeId: employee.user?.employeeId || '',
    };
    res.json(payload);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Update own profile (limited fields) — maps flat fields into nested personalDetails
exports.updateProfile = async (req, res) => {
  try {
    const { phone, address, name } = req.body;
    const updates = {
      ...(phone !== undefined ? { 'personalDetails.phone': phone } : {}),
      ...(address !== undefined ? { 'personalDetails.address': address } : {}),
      ...(name !== undefined ? { 'personalDetails.name': name } : {}),
    };
    const employee = await Employee.findOneAndUpdate({ user: req.user.id }, { $set: updates }, { new: true }).populate('user');
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Profile updated', employee });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Admin: list all employees
exports.listEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('user');
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Upload profile photo
exports.uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const photoUrl = `/uploads/${req.file.filename}`;
    const employee = await Employee.findOneAndUpdate(
      { user: req.user.id },
      { $set: { 'personalDetails.profilePicture': photoUrl } },
      { new: true }
    );
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Uploaded', profilePhoto: photoUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
