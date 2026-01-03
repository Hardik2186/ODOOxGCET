// Handles attendance check-in/out, view
const Attendance = require('../models/Attendance');

// Employee: check-in
exports.checkIn = async (req, res) => {
  try {
    const today = new Date().setHours(0,0,0,0);
    let attendance = await Attendance.findOne({ user: req.user.id, date: today });
    if (attendance && attendance.checkIn) return res.status(400).json({ message: 'Already checked in' });
    if (!attendance) attendance = new Attendance({ user: req.user.id, date: today });
    attendance.checkIn = new Date();
    attendance.status = 'Present';
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee: check-out
exports.checkOut = async (req, res) => {
  try {
    const today = new Date().setHours(0,0,0,0);
    const attendance = await Attendance.findOne({ user: req.user.id, date: today });
    if (!attendance || !attendance.checkIn) return res.status(400).json({ message: 'Check-in first' });
    if (attendance.checkOut) return res.status(400).json({ message: 'Already checked out' });
    attendance.checkOut = new Date();
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Employee: view own attendance
exports.viewOwnAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ user: req.user.id });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin: view all attendance
exports.adminViewAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().populate('user');
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
