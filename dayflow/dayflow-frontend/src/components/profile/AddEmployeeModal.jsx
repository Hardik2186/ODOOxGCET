import React, { useState } from 'react';
import { X, User, Briefcase, DollarSign } from 'lucide-react';

const AddEmployeeModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    salary: '',
    status: 'present',
    checkIn: '-'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your MongoDB here
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1a1a1a] border border-white/10 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#222]">
          <h2 className="text-xl font-bold text-white tracking-tight">New Employee</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-600" size={16} />
              <input 
                required
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-purple-500 outline-none transition-colors"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Job Role</label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-2.5 text-gray-600" size={16} />
              <input 
                required
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-purple-500 outline-none transition-colors"
                placeholder="e.g. Full Stack Developer"
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Monthly Salary (₹)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 text-gray-600" size={16} />
              <input 
                required
                type="number"
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-purple-500 outline-none transition-colors"
                placeholder="50000"
                value={formData.salary}
                onChange={e => setFormData({...formData, salary: e.target.value})}
              />
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-gray-400 hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/20"
            >
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;