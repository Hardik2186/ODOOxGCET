import React, { useState } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';

const AvatarDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 hover:bg-white/5 p-1 rounded-full transition-all border border-transparent hover:border-white/10"
      >
        <div className="relative">
          {/* Circular Avatar with Gradient background like the wireframe */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-400 to-orange-400 border border-white/20" />
          {/* Status Dot */}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a0a] rounded-full" />
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          
          <div className="absolute right-0 mt-2 w-48 bg-[#161616] border border-white/10 rounded-xl shadow-2xl z-20 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-blue-600 hover:text-white transition-colors">
              <User size={14} /> My Profile
            </button>
            <div className="h-[1px] bg-white/5 my-1" />
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarDropdown;