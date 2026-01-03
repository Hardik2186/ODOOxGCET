import React from 'react';
import { Search, Plus, Check, X } from 'lucide-react';

const TimeOffView = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Sub-Tabs: Time Off / Allocation */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-white/5 w-fit rounded-lg">
        <button className="px-6 py-2 bg-white dark:bg-[#1e1e1e] rounded-md shadow-sm font-bold">Time Off</button>
        <button className="px-6 py-2 text-slate-500 dark:text-gray-400">Allocation</button>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-2 rounded-lg font-bold uppercase tracking-widest shadow-lg shadow-purple-900/20">
          <Plus size={18}/> New
        </button>
        <div className="relative flex-1">
          <input 
            type="text" placeholder="Searchbar" 
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-black/40 outline-none"
          />
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
        </div>
      </div>

      {/* Leave Balance Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
          <h3 className="text-blue-500 font-bold mb-2">Paid time Off</h3>
          <p className="text-2xl font-black">24 Days Available</p>
        </div>
        <div className="p-6 bg-white dark:bg-[#121212] border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm">
          <h3 className="text-blue-400 font-bold mb-2">Sick time off</h3>
          <p className="text-2xl font-black">07 Days Available</p>
        </div>
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121212]">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-xs uppercase font-bold text-slate-500">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Start Date</th>
              <th className="p-4">End Date</th>
              <th className="p-4">Type</th>
              <th className="p-4 text-center">Status / Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            <tr className="hover:bg-slate-50 dark:hover:bg-white/5">
              <td className="p-4 font-medium">[Emp Name]</td>
              <td className="p-4">28/10/2025</td>
              <td className="p-4">28/10/2025</td>
              <td className="p-4 text-blue-400">Paid time Off</td>
              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button className="p-1.5 bg-red-500/20 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all" title="Reject">
                    <X size={16}/>
                  </button>
                  <button className="p-1.5 bg-green-500/20 text-green-500 rounded hover:bg-green-50 hover:text-white transition-all" title="Approve">
                    <Check size={16}/>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeOffView;