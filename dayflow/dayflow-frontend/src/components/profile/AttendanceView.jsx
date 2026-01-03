import React from 'react';
import { Search, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const AttendanceView = () => {
  const attendanceData = [
    { name: 'Infamous Kangaroo', checkIn: '10:00', checkOut: '19:00', workHours: '09:00', extra: '01:00' },
    { name: 'Turbobooster', checkIn: '10:00', checkOut: '19:00', workHours: '09:00', extra: '01:00' },
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold dark:text-white">Attendance</h2>
        <div className="relative w-full md:w-96">
          <input 
            type="text" placeholder="Search..." 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-black/40 outline-none focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
        </div>
      </div>

      {/* Date Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-white dark:bg-[#121212] rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
        <div className="flex border border-slate-200 dark:border-white/10 rounded-lg overflow-hidden">
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 border-r border-slate-200 dark:border-white/10"><ChevronLeft size={20}/></button>
          <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5"><ChevronRight size={20}/></button>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5">
          <Calendar size={18}/> <span>Date</span>
        </button>
        <button className="px-4 py-2 border border-slate-200 dark:border-white/10 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5">Day</button>
        <span className="ml-auto px-4 font-medium text-slate-500 dark:text-gray-400">22, October 2025</span>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121212]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-gray-400 text-sm">
              <th className="p-4 font-semibold">Emp</th>
              <th className="p-4 font-semibold">Check In</th>
              <th className="p-4 font-semibold">Check Out</th>
              <th className="p-4 font-semibold">Work Hours</th>
              <th className="p-4 font-semibold">Extra hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {attendanceData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <td className="p-4 font-medium">[ {row.name} ]</td>
                <td className="p-4">{row.checkIn}</td>
                <td className="p-4">{row.checkOut}</td>
                <td className="p-4">{row.workHours}</td>
                <td className="p-4 text-blue-500 font-bold">{row.extra}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceView;