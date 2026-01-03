import React, { useState, useEffect } from 'react';
import { User, LogOut, ChevronDown, Moon, Sun } from 'lucide-react';

const AvatarDropdown = ({ profileImage, onViewChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Initialize state based on current document class
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-200 dark:hover:bg-white/5 transition-colors"
      >
        <div className="relative">
          {profileImage ? (
            <img src={profileImage} className="w-9 h-9 rounded-full object-cover border border-slate-300 dark:border-white/20" alt="Avatar" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 border border-slate-300 dark:border-white/20" />
          )}
        </div>
        <ChevronDown size={14} className="text-slate-500 dark:text-gray-400" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#161616] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
            
            <button 
              onClick={() => { onViewChange('profile'); setIsOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-blue-600 dark:hover:text-white transition-colors"
            >
              <User size={14} /> My Profile
            </button>

            {/* THEME TOGGLE ACTION */}
            <div className="border-y border-slate-100 dark:border-white/5 my-1 py-1">
              <button 
                onClick={() => setIsDark(!isDark)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isDark ? <Moon size={14} /> : <Sun size={14} />}
                  <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
                </div>
                {/* Visual Toggle Switch */}
                <div className={`w-8 h-4 rounded-full relative transition-colors ${isDark ? 'bg-blue-600' : 'bg-slate-300'}`}>
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${isDark ? 'right-1' : 'left-1'}`} />
                </div>
              </button>
            </div>

            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarDropdown;