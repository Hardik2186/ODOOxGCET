const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'admin', 'hr'], default: 'employee' },
  isEmailVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', UserSchema);
