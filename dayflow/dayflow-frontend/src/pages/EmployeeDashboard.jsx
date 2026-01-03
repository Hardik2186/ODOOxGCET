import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Clock, 
  Calendar, 
  DollarSign, 
  LogOut,
  ChevronRight 
} from 'lucide-react';
import { attendanceAPI, leaveAPI } from '../lib/api';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(userData);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [attendanceRes, leaveRes] = await Promise.all([
        attendanceAPI.getTodayStatus(),
        leaveAPI.getLeaveBalance(),
      ]);
      setTodayAttendance(attendanceRes.data);
      setLeaveBalance(leaveRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const tiles = [
    {
      title: 'My Profile',
      icon: User,
      color: 'from-blue-500 to-blue-600',
      description: 'View and edit your personal information',
      route: '/employee/profile',
    },
    {
      title: 'My Attendance',
      icon: Clock,
      color: 'from-green-500 to-green-600',
      description: todayAttendance?.status || 'Check in/out and view attendance',
      route: '/employee/attendance',
    },
    {
      title: 'My Leaves',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      description: leaveBalance ? `${leaveBalance.available} days available` : 'Apply and manage leaves',
      route: '/employee/leaves',
    },
    {
      title: 'My Salary',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600',
      description: 'View salary details and slips',
      route: '/employee/salary',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Employee Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, {user?.name || 'Employee'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Today's Status</p>
            <p className="text-xl font-semibold text-gray-900 mt-1">
              {todayAttendance?.status || 'Not Checked In'}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Working Hours Today</p>
            <p className="text-xl font-semibold text-gray-900 mt-1">
              {todayAttendance?.workingHours || '0:00'} hrs
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600">Leave Balance</p>
            <p className="text-xl font-semibold text-gray-900 mt-1">
              {leaveBalance?.available || 0} days
            </p>
          </div>
        </div>

        {/* Dashboard Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {tiles.map((tile, index) => {
            const Icon = tile.icon;
            return (
              <div
                key={index}
                onClick={() => navigate(tile.route)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${tile.color}`} />
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${tile.color}`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {tile.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {tile.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight 
                      className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" 
                      size={24} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/employee/attendance')}
              className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-colors text-left"
            >
              <Clock className="text-green-600 mb-2" size={24} />
              <p className="font-semibold text-gray-900">Check In/Out</p>
              <p className="text-sm text-gray-600">Mark your attendance</p>
            </button>
            <button
              onClick={() => navigate('/employee/leaves')}
              className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-left"
            >
              <Calendar className="text-purple-600 mb-2" size={24} />
              <p className="font-semibold text-gray-900">Apply Leave</p>
              <p className="text-sm text-gray-600">Request time off</p>
            </button>
            <button
              onClick={() => navigate('/employee/profile')}
              className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-left"
            >
              <User className="text-blue-600 mb-2" size={24} />
              <p className="font-semibold text-gray-900">Update Profile</p>
              <p className="text-sm text-gray-600">Edit your information</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
