// Handles leave requests, approvals
const Leave = require('../models/Leave');

// Employee: apply for leave
exports.applyLeave = async (req, res) => {
  try {
    const { type, dateRange, remarks } = req.body;
    const leave = await Leave.create({ user: req.user.id, type, dateRange, remarks });
    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee: view own leaves
exports.viewOwnLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({ user: req.user.id });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: view all leave requests
exports.adminViewAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('user');
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: approve leave
exports.adminApproveLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(id, { status: 'Approved', adminComments: req.body.adminComments }, { new: true });
    res.json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: reject leave
exports.adminRejectLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(id, { status: 'Rejected', adminComments: req.body.adminComments }, { new: true });
    res.json(leave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee: cancel a leave
exports.cancelLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findOne({ _id: id, user: req.user.id });
    if (!leave) return res.status(404).json({ message: 'Leave not found' });
    await leave.remove();
    res.json({ message: 'Leave cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee: simple leave balance (placeholder)
exports.getLeaveBalance = async (req, res) => {
  try {
    // For demo: return a fixed balance. In prod compute based on company policy.
    res.json({ available: 12, taken: 3 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
