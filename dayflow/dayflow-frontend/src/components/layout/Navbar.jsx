import React, { useState } from 'react';
import { ChevronDown, LogOut, User, Bell } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-white/10 bg-[#0f0f0f] sticky top-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
            H
          </div>
          <span className="font-semibold text-white hidden md:block">HRMS Core</span>
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">Employees</a>
          <a href="#" className="hover:text-white transition-colors">Attendance</a>
          <a href="#" className="hover:text-white transition-colors">Time Off</a>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 hover:bg-white/5 p-1 rounded-full transition-colors"
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 border border-white/20" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#0f0f0f] rounded-full" />
            </div>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-lg shadow-2xl overflow-hidden py-1 animate-in fade-in zoom-in duration-200">
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-blue-600 hover:text-white transition-colors">
                <User size={14} /> My Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5">
                <LogOut size={14} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;