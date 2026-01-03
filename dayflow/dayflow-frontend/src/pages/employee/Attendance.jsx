import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Calendar, 
  LogIn,
  LogOut as LogOutIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import EmployeeSidebar from '../../components/employee/Sidebar';
import { attendanceAPI } from '../../lib/api';

const EmployeeAttendance = () => {
  const navigate = useNavigate();
  const [todayStatus, setTodayStatus] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [monthSummary, setMonthSummary] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchAttendanceData();
  }, [currentMonth, currentYear]);

  const fetchAttendanceData = async () => {
    try {
      const [todayRes, recordsRes, summaryRes] = await Promise.all([
        attendanceAPI.getTodayStatus(),
        attendanceAPI.getMyAttendance(currentMonth + 1, currentYear),
        attendanceAPI.getMonthSummary(currentMonth + 1, currentYear),
      ]);
      setTodayStatus(todayRes.data);
      setAttendanceRecords(recordsRes.data);
      setMonthSummary(summaryRes.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    setCheckingIn(true);
    try {
      await attendanceAPI.checkIn();
      fetchAttendanceData();
      alert('✅ Checked in successfully!');
    } catch (error) {
      console.error('Error checking in:', error);
      alert(error.response?.data?.message || 'Failed to check in');
    } finally {
      setCheckingIn(false);
    }
  };

  const handleCheckOut = async () => {
    setCheckingIn(true);
    try {
      await attendanceAPI.checkOut();
      fetchAttendanceData();
      alert('✅ Checked out successfully!');
    } catch (error) {
      console.error('Error checking out:', error);
      alert(error.response?.data?.message || 'Failed to check out');
    } finally {
      setCheckingIn(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Present: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      'Half-day': { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
      Absent: { color: 'bg-red-100 text-red-800', icon: XCircle },
      Leave: { color: 'bg-blue-100 text-blue-800', icon: Calendar },
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', icon: AlertCircle };
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon size={16} />
        {status}
      </span>
    );
  };

  const calculateWorkingHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return '0:00';
    const diff = new Date(checkOut) - new Date(checkIn);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <EmployeeSidebar userName={user?.name} />

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
          <p className="text-gray-600 mt-2">Track your attendance and working hours</p>
        </div>

        {/* Today's Check-In/Check-Out Card */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8 text-white mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Time Display */}
            <div>
              <p className="text-blue-100 text-sm font-semibold uppercase mb-2">Today's Date</p>
              <p className="text-4xl font-bold mb-4">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
              <p className="text-xl text-blue-100">
                Current Time: <span className="font-bold text-3xl">{new Date().toLocaleTimeString()}</span>
              </p>
            </div>

            {/* Right Side - Check In/Out Info */}
            <div className="flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <p className="text-blue-100 text-sm mb-1">Check In</p>
                  <p className="text-3xl font-bold">
                    {todayStatus?.checkIn 
                      ? new Date(todayStatus.checkIn).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })
                      : '---'}
                  </p>
                </div>
                <div className="bg-white/20 backdrop-blur rounded-lg p-4">
                  <p className="text-blue-100 text-sm mb-1">Check Out</p>
                  <p className="text-3xl font-bold">
                    {todayStatus?.checkOut 
                      ? new Date(todayStatus.checkOut).toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })
                      : '---'}
                  </p>
                </div>
              </div>

              {/* Check-In/Out Buttons */}
              <div className="flex gap-4">
                {!todayStatus?.checkIn ? (
                  <button
                    onClick={handleCheckIn}
                    disabled={checkingIn}
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95"
                  >
                    <LogIn size={24} />
                    {checkingIn ? 'Checking In...' : 'Check In'}
                  </button>
                ) : !todayStatus?.checkOut ? (
                  <button
                    onClick={handleCheckOut}
                    disabled={checkingIn}
                    className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95"
                  >
                    <LogOutIcon size={24} />
                    {checkingIn ? 'Checking Out...' : 'Check Out'}
                  </button>
                ) : (
                  <div className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-green-500 text-white rounded-xl font-bold text-lg">
                    <CheckCircle size={24} />
                    Completed for Today
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Working Hours Display */}
          <div className="mt-8 pt-8 border-t border-blue-500 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-blue-100 text-sm mb-1">Working Hours</p>
              <p className="text-4xl font-bold">{todayStatus?.workingHours || '0:00'}</p>
              <p className="text-blue-200 text-xs mt-2">hrs</p>
            </div>
            <div className="text-center">
              <p className="text-blue-100 text-sm mb-1">Status</p>
              <p className="text-2xl font-bold mt-2">{todayStatus?.status || 'Not Started'}</p>
            </div>
            <div className="text-center">
              <p className="text-blue-100 text-sm mb-1">Break Time</p>
              <p className="text-4xl font-bold">0:00</p>
              <p className="text-blue-200 text-xs mt-2">hrs</p>
            </div>
          </div>
        </div>

        {/* Monthly Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">PRESENT DAYS</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {monthSummary?.presentDays || 0}
                </p>
              </div>
              <CheckCircle className="text-green-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">HALF DAYS</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {monthSummary?.halfDays || 0}
                </p>
              </div>
              <AlertCircle className="text-yellow-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">ABSENT</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {monthSummary?.absentDays || 0}
                </p>
              </div>
              <XCircle className="text-red-500" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold">TOTAL WORKING</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">
                  {monthSummary?.totalWorkingDays || 0}
                </p>
              </div>
              <Calendar className="text-blue-500" size={40} />
            </div>
          </div>
        </div>

        {/* Attendance Records Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Attendance History</h2>
              <p className="text-gray-600 text-sm mt-1">Detailed attendance records</p>
            </div>
            <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-lg">
              <button
                onClick={handlePreviousMonth}
                className="p-2 hover:bg-gray-200 rounded-lg transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-semibold text-lg min-w-max">
                {monthNames[currentMonth]} {currentYear}
              </span>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-200 rounded-lg transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Check In</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Check Out</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Working Hours</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Extra Hours</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.length > 0 ? (
                  attendanceRecords.map((record, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 transition-all">
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-gray-900">
                          {new Date(record.date).toLocaleDateString('en-US', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(record.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {record.checkIn 
                            ? new Date(record.checkIn).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {record.checkOut 
                            ? new Date(record.checkOut).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })
                            : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-blue-600">
                          {calculateWorkingHours(record.checkIn, record.checkOut)} hrs
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {record.extraHours || '0:00'} hrs
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(record.status)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
                      <p className="text-lg">No attendance records found</p>
                      <p className="text-sm mt-2">Records will appear here as you check in</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeAttendance;
