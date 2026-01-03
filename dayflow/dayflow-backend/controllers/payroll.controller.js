// Handles payroll view/update
const Payroll = require('../models/Payroll');

// Employee: view own payroll
exports.viewOwnPayroll = async (req, res) => {
  try {
    const payroll = await Payroll.findOne({ user: req.user.id });
    res.json(payroll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: view all payrolls
exports.adminViewAllPayroll = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate('user');
    res.json(payrolls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: update payroll
exports.adminUpdatePayroll = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const payroll = await Payroll.findByIdAndUpdate(id, updates, { new: true });
    res.json(payroll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
