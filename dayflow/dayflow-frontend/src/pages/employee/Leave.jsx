import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  ArrowLeft,
  Plus,
  X,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  FileText,
  AlertCircle,
  TrendingDown
} from 'lucide-react';
import EmployeeSidebar from '../../components/employee/Sidebar';
import { leaveAPI } from '../../lib/api';

const EmployeeLeave = () => {
  const navigate = useNavigate();
  const [leaves, setLeaves] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    leaveType: 'Paid',
    startDate: '',
    endDate: '',
    reason: '',
    attachment: null,
  });

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    try {
      const [leavesRes, balanceRes] = await Promise.all([
        leaveAPI.getMyLeaves(),
        leaveAPI.getLeaveBalance(),
      ]);
      setLeaves(leavesRes.data);
      setLeaveBalance(balanceRes.data);
    } catch (error) {
      console.error('Error fetching leave data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, attachment: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate dates
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      alert('End date must be after start date');
      return;
    }

    try {
      const leaveData = new FormData();
      leaveData.append('leaveType', formData.leaveType);
      leaveData.append('startDate', formData.startDate);
      leaveData.append('endDate', formData.endDate);
      leaveData.append('reason', formData.reason);
      if (formData.attachment) {
        leaveData.append('attachment', formData.attachment);
      }

      await leaveAPI.applyLeave(leaveData);
      
      setShowModal(false);
      setFormData({
        leaveType: 'Paid',
        startDate: '',
        endDate: '',
        reason: '',
        attachment: null,
      });
      fetchLeaveData();
      alert('Leave application submitted successfully!');
    } catch (error) {
      console.error('Error applying for leave:', error);
      alert(error.response?.data?.message || 'Failed to apply for leave');
    }
  };

  const calculateLeaveDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      Pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      Approved: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      Rejected: { color: 'bg-red-100 text-red-800', icon: XCircle },
    };
    
    const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', icon: Clock };
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon size={16} />
        {status}
      </span>
    );
  };

  const leaveTypes = [
    { value: 'Paid', label: 'Paid Time Off', color: 'blue' },
    { value: 'Sick', label: 'Sick Leave', color: 'red' },
    { value: 'Unpaid', label: 'Unpaid Leave', color: 'gray' },
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
      <EmployeeSidebar userName={JSON.parse(localStorage.getItem('user') || '{}')?.name} />

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8">
        {/* Page Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Leaves</h1>
            <p className="text-gray-600 mt-2">Apply and manage your time off</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <Plus size={20} />
            Apply Leave
          </button>
        </div>

        {/* Leave Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-8 text-white hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Paid Time Off</h3>
              <Calendar size={32} className="text-blue-200 opacity-80" />
            </div>
            <p className="text-5xl font-bold mb-2">{leaveBalance?.paidLeave || 24}</p>
            <p className="text-blue-100 text-sm">Days Available</p>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg p-8 text-white hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Sick Leave</h3>
              <AlertCircle size={32} className="text-red-200 opacity-80" />
            </div>
            <p className="text-5xl font-bold mb-2">{leaveBalance?.sickLeave || 7}</p>
            <p className="text-red-100 text-sm">Days Available</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Total Used</h3>
              <TrendingDown size={32} className="text-purple-200 opacity-80" />
            </div>
            <p className="text-5xl font-bold mb-2">{leaveBalance?.usedLeave || 0}</p>
            <p className="text-purple-100 text-sm">Days This Year</p>
          </div>
        </div>

        {/* Leave Types Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Leave Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaveTypes.map((type) => (
              <div key={type.value} className={`p-4 rounded-lg border-l-4 bg-${type.color}-50 border-${type.color}-500`}>
                <h4 className="font-semibold text-gray-900 mb-2">{type.label}</h4>
                <p className="text-sm text-gray-600">
                  {type.value === 'Paid' && 'Standard paid time off for holidays and vacation'}
                  {type.value === 'Sick' && 'For illness and medical appointments'}
                  {type.value === 'Unpaid' && 'Unpaid leave as per company policy'}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leave History */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-blue-50">
            <h2 className="text-2xl font-bold text-gray-900">Leave History</h2>
            <p className="text-gray-600 mt-2">View all your leave applications and their status</p>
          </div>

          <div className="divide-y divide-gray-200">
            {leaves.length > 0 ? (
              leaves.map((leave, index) => (
                <div key={index} className="p-8 hover:bg-gray-50 transition-all border-l-4 border-transparent hover:border-purple-500">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <h3 className="text-xl font-bold text-gray-900">
                          {leave.leaveType} Time Off
                        </h3>
                        {getStatusBadge(leave.status)}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4 bg-gray-50 rounded-lg p-4">
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase">From</p>
                          <p className="font-bold text-gray-900 mt-1">
                            {new Date(leave.startDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase">To</p>
                          <p className="font-bold text-gray-900 mt-1">
                            {new Date(leave.endDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase">Duration</p>
                          <p className="font-bold text-gray-900 mt-1">
                            {calculateLeaveDays(leave.startDate, leave.endDate)} days
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-semibold uppercase">Applied On</p>
                          <p className="font-bold text-gray-900 mt-1">
                            {new Date(leave.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-semibold text-gray-700">📝 Reason:</p>
                        <p className="text-gray-900 mt-1 bg-blue-50 p-3 rounded-lg">{leave.reason}</p>
                      </div>

                      {leave.attachment && (
                        <div className="mt-3 flex items-center gap-2 text-blue-600">
                          <FileText size={16} />
                          <span className="text-sm">Attachment included</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center text-gray-500">
                <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg">No leave requests yet</p>
                <p className="text-sm mt-2">Click "Apply Leave" to submit your first request</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Leave Application Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Time Off Request</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-6">
                {/* Employee Info (Read-only) */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Employee</p>
                  <p className="font-semibold text-gray-900">
                    {JSON.parse(localStorage.getItem('user') || '{}').name || '[Employee]'}
                  </p>
                </div>

                {/* Leave Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time off Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="leaveType"
                    value={formData.leaveType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="Paid">Paid Time Off</option>
                    <option value="Sick">Sick Leave</option>
                    <option value="Unpaid">Unpaid Leave</option>
                  </select>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      To Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      required
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Duration Display */}
                {formData.startDate && formData.endDate && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Duration:</strong> {calculateLeaveDays(formData.startDate, formData.endDate)} days
                    </p>
                  </div>
                )}

                {/* Reason */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Leave <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Please provide a detailed reason for your leave request..."
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Attachment */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Attachment (For sick leave certificate)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <label className="cursor-pointer">
                      <span className="text-purple-600 hover:text-purple-700 font-medium">
                        Click to upload
                      </span>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                    {formData.attachment && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ {formData.attachment.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-semibold"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-semibold"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeLeave;
