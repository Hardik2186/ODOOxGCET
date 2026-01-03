import React, { useState, useEffect } from 'react';

const SalaryInfoView = () => {
  const [wage, setWage] = useState(50000);
  const [components, setComponents] = useState({
    basic: 0,
    hra: 0,
    standard: 4167, // Fixed amount as per image
    performance: 0,
    lta: 0,
    fixed: 0,
    pf: 0,
    tax: 200 // Fixed as per image
  });

  useEffect(() => {
    const basic = wage * 0.50; // 50%
    const hra = basic * 0.50;  // 50% of Basic
    const performance = basic * 0.0833; // 8.33% of Basic
    const lta = basic * 0.0833; // 8.33% of Basic
    
    // Fixed allowance is the remaining balance
    const subtotal = basic + hra + components.standard + performance + lta;
    const fixed = wage - subtotal;

    setComponents(prev => ({
      ...prev,
      basic,
      hra,
      performance,
      lta,
      fixed,
      pf: basic * 0.12 // PF is 12% of Basic
    }));
  }, [wage]);

  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl p-8 space-y-12">
      
      {/* Top Wage Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-white/5 pb-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">Month Wage</span>
            <div className="flex items-center gap-2">
              <input 
                type="number" 
                value={wage} 
                onChange={(e) => setWage(Number(e.target.value))}
                className="bg-transparent border-b border-blue-500 text-2xl font-bold text-white w-32 outline-none text-right"
              />
              <span className="text-gray-500">/ Month</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-gray-500">
            <span>Yearly Wage</span>
            <span>₹ {wage * 12} / Yearly</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 uppercase font-bold">Working Days/Week</label>
            <input className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 outline-none focus:border-blue-500" placeholder="5" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-gray-500 uppercase font-bold">Break Time (Hrs)</label>
            <input className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 outline-none focus:border-blue-500" placeholder="1" />
          </div>
        </div>
      </div>

      {/* Salary Structure Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Salary Components */}
        <div className="space-y-6">
          <h4 className="text-blue-400 font-bold uppercase tracking-widest text-xs">Salary Components</h4>
          <div className="space-y-4">
            <SalaryRow label="Basic Salary" value={components.basic} percent="50.00%" desc="50% of Monthly Wage" />
            <SalaryRow label="House Rent Allowance" value={components.hra} percent="50.00%" desc="50% of Basic Salary" />
            <SalaryRow label="Standard Allowance" value={components.standard} percent="16.67%" desc="Fixed amount provided" />
            <SalaryRow label="Performance Bonus" value={components.performance} percent="8.33%" desc="8.33% of Basic Salary" />
            <SalaryRow label="Leave Travel Allowance" value={components.lta} percent="8.33%" desc="8.33% of Basic Salary" />
            <SalaryRow label="Fixed Allowance" value={components.fixed} percent="Remaining" desc="Remaining portion of wage" />
          </div>
        </div>

        {/* Right: PF & Tax */}
        <div className="space-y-8">
          <div>
            <h4 className="text-orange-400 font-bold uppercase tracking-widest text-xs mb-6">Provident Fund (PF)</h4>
            <div className="space-y-4">
              <SalaryRow label="Employee Contribution" value={components.pf} percent="12.00%" desc="12% of Basic Salary" />
              <SalaryRow label="Employer Contribution" value={components.pf} percent="12.00%" desc="12% of Basic Salary" />
            </div>
          </div>

          <div>
            <h4 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-6">Tax Deductions</h4>
            <SalaryRow label="Professional Tax" value={components.tax} percent="Fixed" desc="Deducted from Gross Salary" />
          </div>
        </div>

      </div>
    </div>
  );
};

const SalaryRow = ({ label, value, percent, desc }) => (
  <div className="group border-b border-white/5 pb-2">
    <div className="flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className="text-[10px] text-gray-600 italic">{desc}</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-sm font-bold text-white">₹ {value.toFixed(2)}</span>
        <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-gray-400 min-w-[50px] text-center">{percent}</span>
      </div>
    </div>
  </div>
);

export default SalaryInfoView;