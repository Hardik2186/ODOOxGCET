import React, { useState, useEffect } from 'react';
import AvatarDropdown from './AvatarDropdown';
import { LayoutGrid, Clock } from 'lucide-react';

const Navbar = ({ profileImage, isCheckedIn, onToggleAttendance, onViewChange, currentView, checkInTime }) => {
  const [elapsed, setElapsed] = useState("00:00:00");

  useEffect(() => {
    let interval;
    if (isCheckedIn && checkInTime) {
      interval = setInterval(() => {
        const now = new Date();
        const diff = Math.floor((now - checkInTime) / 1000);
        const h = Math.floor(diff / 3600).toString().padStart(2, '0');
        const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
        const s = (diff % 60).toString().padStart(2, '0');
        setElapsed(`${h}:${m}:${s}`);
      }, 1000);
    } else {
      setElapsed("00:00:00");
    }
    return () => clearInterval(interval);
  }, [isCheckedIn, checkInTime]);

  return (
    <nav className="border-b border-white/10 bg-[#0f0f0f] sticky top-0 z-50 px-6 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('profile')}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">H</div>
            <span className="font-semibold text-white tracking-tight">HRMS Core</span>
          </div>

          {/* RESTORED NAVIGATION LINKS */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button 
              onClick={() => onViewChange('profile')}
              className={`pb-1 transition-all ${currentView === 'profile' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
            >
              Profile
            </button>
            <button 
              onClick={() => onViewChange('employees')}
              className={`pb-1 transition-all ${currentView === 'employees' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
            >
              Employees
            </button>
            <button 
              onClick={() => onViewChange('attendance')}
              className={`pb-1 transition-all ${currentView === 'attendance' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
            >
              Attendance
            </button>
            <button 
              onClick={() => onViewChange('timeoff')}
              className={`pb-1 transition-all ${currentView === 'timeoff' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white'}`}
            >
              Time Off
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {isCheckedIn && (
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-lg">
              <Clock size={14} className="text-green-500 animate-pulse" />
              <span className="text-xs font-mono text-green-500 font-bold">{elapsed}</span>
            </div>
          )}

          <div className="flex items-center gap-4">
            {/* Blue Systray Square from Picture */}
            <button 
              onClick={onToggleAttendance}
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all border ${
                isCheckedIn ? 'bg-green-600 border-green-400 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'bg-[#1e293b] border-blue-500/50 text-blue-400 hover:bg-blue-600 hover:text-white'
              }`}
            >
              <LayoutGrid size={20} />
            </button>
            <AvatarDropdown 
                profileImage={profileImage} 
                onViewChange={onViewChange} 
                />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;