import React from 'react';
import AvatarDropdown from './AvatarDropdown'; // Make sure the path is correct

const Navbar = () => {
  return (
    <nav className="border-b border-white/10 bg-[#0f0f0f] sticky top-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Left Section: Company Logo */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-900/20 group-hover:bg-blue-500 transition-colors">
            H
          </div>
          <span className="font-semibold text-white hidden md:block tracking-tight">
            HRMS Core
          </span>
        </div>

        {/* Center Section: Menu Items */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="text-gray-400 hover:text-white transition-colors relative group">
            Employees
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors relative group">
            Attendance
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors relative group">
            Time Off
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </a>
        </div>

        {/* Right Section: Avatar & Dropdown */}
        <div className="flex items-center gap-4">
          {/* We use the reusable component here */}
          <AvatarDropdown />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;