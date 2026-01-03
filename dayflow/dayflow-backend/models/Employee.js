const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalDetails: {
    name: String,
    address: String,
    phone: String,
    profilePicture: String,
  },
  jobDetails: {
    designation: String,
    department: String,
    joiningDate: Date,
    salary: Number,
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  },
  documents: [String],
});

module.exports = mongoose.model('Employee', EmployeeSchema);
