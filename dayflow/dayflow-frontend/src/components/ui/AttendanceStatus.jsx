import React, { useState } from 'react';

const AttendanceStatus = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full border border-white/5">
        <div className={`w-2 h-2 rounded-full ${isCheckedIn ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-xs font-medium uppercase tracking-wider">
          {isCheckedIn ? 'Online' : 'Offline'}
        </span>
      </div>
      <button 
        onClick={() => setIsCheckedIn(!isCheckedIn)}
        className={`text-xs px-4 py-1.5 rounded-lg font-bold transition-all ${
          isCheckedIn 
          ? 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20' 
          : 'bg-blue-600 text-white hover:bg-blue-500'
        }`}
      >
        {isCheckedIn ? 'Check Out' : 'Check In'}
      </button>
    </div>
  );
};

export default AttendanceStatus;