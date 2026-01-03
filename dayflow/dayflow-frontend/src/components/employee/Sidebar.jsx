import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home,
  User,
  Clock,
  Calendar,
  DollarSign,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Settings,
  HelpCircle
} from 'lucide-react';

const EmployeeSidebar = ({ userName = 'Employee' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      name: 'Dashboard',
      icon: Home,
      path: '/employee/dashboard',
      color: 'text-blue-600',
    },
    {
      name: 'My Profile',
      icon: User,
      path: '/employee/profile',
      color: 'text-blue-600',
    },
    {
      name: 'Attendance',
      icon: Clock,
      path: '/employee/attendance',
      color: 'text-green-600',
    },
    {
      name: 'My Leaves',
      icon: Calendar,
      path: '/employee/leaves',
      color: 'text-purple-600',
    },
    {
      name: 'My Salary',
      icon: DollarSign,
      path: '/employee/salary',
      color: 'text-orange-600',
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 lg:hidden z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 z-40 ${
          isOpen ? 'w-64' : 'w-0'
        } lg:w-64 overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Logo Section */}
          <div className="p-6 border-b border-blue-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-400 rounded-lg flex items-center justify-center font-bold text-xl">
                DF
              </div>
              <div>
                <h1 className="font-bold text-lg">DayFlow</h1>
                <p className="text-xs text-blue-200">HRMS Portal</p>
              </div>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="p-4 mx-3 mt-4 bg-blue-700 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center font-bold text-lg">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm truncate">{userName}</p>
                <p className="text-xs text-blue-200">Employee</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
            <p className="text-xs font-semibold text-blue-300 px-3 mb-3 uppercase tracking-wider">
              Main Menu
            </p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    isMobile && setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? 'bg-white text-blue-900 font-semibold shadow-lg'
                      : 'text-blue-100 hover:bg-blue-700'
                  }`}
                >
                  <Icon size={20} className={active ? 'text-blue-900' : item.color} />
                  <span className="flex-1 text-left">{item.name}</span>
                  {active && <ChevronRight size={18} />}
                </button>
              );
            })}

            <div className="my-4 border-t border-blue-700" />

            <p className="text-xs font-semibold text-blue-300 px-3 mb-3 uppercase tracking-wider">
              Support
            </p>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-700 transition-all">
              <HelpCircle size={20} className="text-blue-300" />
              <span className="flex-1 text-left">Help & Support</span>
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-700 transition-all">
              <Settings size={20} className="text-blue-300" />
              <span className="flex-1 text-left">Settings</span>
            </button>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-blue-700">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className={`transition-all duration-300 ${isOpen && !isMobile ? 'ml-64' : ''} lg:ml-64`}>
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <p className="text-sm text-gray-600">
              Welcome back, <span className="font-semibold text-gray-900">{userName}</span>
            </p>
          </div>
        </header>
      </div>
    </>
  );
};

export default EmployeeSidebar;
