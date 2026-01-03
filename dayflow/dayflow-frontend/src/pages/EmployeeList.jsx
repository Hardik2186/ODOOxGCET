import React from 'react';
import { Search, Plane, DollarSign, Clock } from 'lucide-react';

const EmployeeList = () => {
  const employees = [
    { id: 1, name: 'Alex Rivera', role: 'Sr. Product Designer', status: 'present', salary: '50,000', checkIn: '09:15 AM' },
    { id: 2, name: 'Sarah Jenkins', role: 'Engineering Manager', status: 'leave', salary: '85,000', checkIn: '-' },
    { id: 3, name: 'Ronak Shah', role: 'Full Stack Developer', status: 'absent', salary: '45,000', checkIn: '-' },
    { id: 4, name: 'Jenil Patel', role: 'UI/UX Intern', status: 'present', salary: '15,000', checkIn: '10:02 AM' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between gap-4 bg-[#121212] p-4 rounded-xl border border-white/5">
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-lg shadow-blue-900/20">
          + Add New Employee
        </button>
        <div className="relative flex-1 max-w-md">
          <input type="text" placeholder="Search by name or role..." className="w-full bg-black/40 border border-white/10 rounded-lg py-2 px-10 outline-none focus:border-blue-500/50 text-sm" />
          <Search className="absolute left-3 top-2.5 text-gray-600" size={16} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {employees.map((emp) => (
          <div key={emp.id} className="bg-[#121212] border border-white/10 rounded-2xl p-5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
            <div className="absolute top-4 right-4"><StatusIcon status={emp.status} /></div>
            
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center text-blue-400 font-bold text-xl">
                {emp.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg group-hover:text-blue-400 transition-colors">{emp.name}</h3>
                <p className="text-gray-500 text-xs font-medium">{emp.role}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
              <div className="space-y-1">
                <p className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-gray-600 tracking-wider"><DollarSign size={10}/> Salary</p>
                <p className="text-sm font-bold text-gray-300">₹{emp.salary}</p>
              </div>
              <div className="space-y-1">
                <p className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-gray-600 tracking-wider"><Clock size={10}/> Checked In</p>
                <p className={`text-sm font-bold ${emp.checkIn === '-' ? 'text-gray-700' : 'text-green-500'}`}>{emp.checkIn}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatusIcon = ({ status }) => {
  if (status === 'present') return <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />;
  if (status === 'leave') return <Plane size={14} className="text-blue-400 rotate-45" />;
  return <div className="w-3 h-3 rounded-full bg-orange-600 shadow-[0_0_10px_#ea580c]" />;
};

export default EmployeeList;