const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  checkIn: Date,
  checkOut: Date,
  status: { type: String, enum: ['Present', 'Absent', 'Half-day', 'Leave'], default: 'Absent' },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
