import React, { useState } from 'react';
import { X, User, Briefcase, DollarSign } from 'lucide-react';
import { adminAPI } from '../../lib/api';

const AddEmployeeModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'employee',
    salary: '',
    status: 'present',
    checkIn: '-'
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Call admin API to create employee
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        salary: formData.salary
      };
      const res = await adminAPI.createEmployee(payload);
      const created = res.data;
      // Map created record to UI shape and inform parent
      const newEmployee = {
        id: created.employee?._id || created.user?.id || Date.now(),
        name: created.employee?.personalDetails?.name || payload.name,
        role: created.user?.role || payload.role,
        salary: created.employee?.jobDetails?.salary ? String(created.employee.jobDetails.salary) : String(payload.salary || 0),
        checkIn: '-',
        status: 'present'
      };
      onAdd(newEmployee);
      onClose();
      alert('Employee created');
    } catch (err) {
      console.error('Failed to create employee', err);
      alert(err.response?.data?.message || err.message || 'Failed to create employee');
    } finally {
      setSubmitting(false);
    }
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
                disabled={submitting}
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
                disabled={submitting}
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:border-purple-500 outline-none transition-colors"
                placeholder="e.g. Full Stack Developer"
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Email</label>
            <input 
              required
              disabled={submitting}
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-purple-500 outline-none"
              placeholder="employee@company.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Temporary Password</label>
            <input 
              required
              disabled={submitting}
              type="password"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:border-purple-500 outline-none"
              placeholder="Set a temporary password"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Monthly Salary (₹)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 text-gray-600" size={16} />
              <input 
                required
                disabled={submitting}
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
              disabled={submitting}
              className="flex-1 py-2.5 rounded-lg bg-purple-600 text-white text-sm font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-900/20 disabled:opacity-50"
            >
              {submitting ? 'Creating...' : 'Create Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;