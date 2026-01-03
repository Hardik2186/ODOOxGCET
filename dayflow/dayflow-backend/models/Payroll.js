const mongoose = require('mongoose');

const PayrollSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  salaryStructure: {
    basic: Number,
    hra: Number,
    allowances: Number,
    deductions: Number,
    netSalary: Number,
  },
  history: [
    {
      date: Date,
      salaryStructure: Object,
    },
  ],
});

module.exports = mongoose.model('Payroll', PayrollSchema);
