// Salary calculation utilities
module.exports = {
  // Calculate net salary
  calculateNetSalary: ({ basic, hra, allowances, deductions }) => {
    return (basic || 0) + (hra || 0) + (allowances || 0) - (deductions || 0);
  },

  // Calculate deductions (stub)
  calculateDeductions: (employee) => {
    // TODO: Implement deduction logic
    return 0;
  },

  // Calculate allowances (stub)
  calculateAllowances: (employee) => {
    // TODO: Implement allowance logic
    return 0;
  },
};
