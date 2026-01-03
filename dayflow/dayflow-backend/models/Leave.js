const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Paid', 'Sick', 'Unpaid'], required: true },
  dateRange: {
    from: { type: Date, required: true },
    to: { type: Date, required: true },
  },
  remarks: String,
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  adminComments: String,
});

module.exports = mongoose.model('Leave', LeaveSchema);
