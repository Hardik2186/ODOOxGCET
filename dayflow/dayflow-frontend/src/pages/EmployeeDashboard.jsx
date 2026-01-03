import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Clock, 
  Calendar, 
  DollarSign, 
  LogOut,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import EmployeeSidebar from '../components/employee/Sidebar';
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
      bgColor: 'bg-blue-50'
    },
    {
      title: 'My Attendance',
      icon: Clock,
      color: 'from-green-500 to-green-600',
      description: todayAttendance?.status || 'Check in/out and view attendance',
      route: '/employee/attendance',
      bgColor: 'bg-green-50'
    },
    {
      title: 'My Leaves',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
      description: leaveBalance ? `${leaveBalance.available} days available` : 'Apply and manage leaves',
      route: '/employee/leaves',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'My Salary',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600',
      description: 'View salary details and slips',
      route: '/employee/salary',
      bgColor: 'bg-orange-50'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <EmployeeSidebar userName={user?.name} />

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Welcome back! 👋</h1>
          <p className="text-gray-600 mt-2">
            {user?.name}, here's what's happening with your work today
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">TODAY'S STATUS</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {todayAttendance?.status || 'Not Checked In'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {todayAttendance?.checkIn 
                    ? `Checked in at ${new Date(todayAttendance.checkIn).toLocaleTimeString()}`
                    : 'No check-in yet'}
                </p>
              </div>
              <Clock className="text-blue-600" size={48} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">WORKING HOURS</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {todayAttendance?.workingHours || '0:00'}
                </p>
                <p className="text-xs text-gray-500 mt-1">hours</p>
              </div>
              <TrendingUp className="text-green-600" size={48} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">LEAVE BALANCE</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {leaveBalance?.available || 0}
                </p>
                <p className="text-xs text-gray-500 mt-1">days remaining</p>
              </div>
              <Calendar className="text-purple-600" size={48} />
            </div>
          </div>
        </div>

        {/* Main Dashboard Tiles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {tiles.map((tile, index) => {
              const Icon = tile.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate(tile.route)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group hover:-translate-y-2"
                >
                  <div className={`h-3 bg-gradient-to-r ${tile.color}`} />
                  <div className="p-8">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`p-4 rounded-xl bg-gradient-to-r ${tile.color}`}>
                            <Icon className="text-white" size={28} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {tile.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          {tile.description}
                        </p>
                      </div>
                      <ChevronRight 
                        className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-2 transition-all flex-shrink-0 mt-2" 
                        size={24} 
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/employee/attendance')}
                className="w-full p-4 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="font-semibold text-gray-900">Check In/Out</p>
                  <p className="text-xs text-gray-600">Mark your attendance</p>
                </div>
                <ChevronRight className="group-hover:translate-x-1 transition-all" size={20} />
              </button>
              <button
                onClick={() => navigate('/employee/leaves')}
                className="w-full p-4 text-left bg-purple-50 hover:bg-purple-100 rounded-lg transition-all flex items-center justify-between group"
              >
                <div>
                  <p className="font-semibold text-gray-900">Apply Leave</p>
                  <p className="text-xs text-gray-600">Request time off</p>
                </div>
                <ChevronRight className="group-hover:translate-x-1 transition-all" size={20} />
              </button>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Announcements</h3>
            <div className="space-y-3">
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                <p className="text-sm font-semibold text-yellow-900">Holiday Notice</p>
                <p className="text-xs text-yellow-700 mt-1">Office closed on January 26, 2026</p>
              </div>
              <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <p className="text-sm font-semibold text-blue-900">System Update</p>
                <p className="text-xs text-blue-700 mt-1">New features released this week</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
