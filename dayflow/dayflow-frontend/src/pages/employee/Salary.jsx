import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  Lock
} from 'lucide-react';
import { payrollAPI } from '../../lib/api';

const EmployeeSalary = () => {
  const navigate = useNavigate();
  const [salaryData, setSalaryData] = useState(null);
  const [salarySlip, setSalarySlip] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);
  const [downloadingSlip, setDownloadingSlip] = useState(false);

  useEffect(() => {
    fetchSalaryData();
  }, []);

  useEffect(() => {
    fetchSalarySlip();
  }, [selectedMonth, selectedYear]);

  const fetchSalaryData = async () => {
    try {
      const response = await payrollAPI.getMySalary();
      setSalaryData(response.data);
    } catch (error) {
      console.error('Error fetching salary:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSalarySlip = async () => {
    try {
      const response = await payrollAPI.getSalarySlip(selectedMonth + 1, selectedYear);
      setSalarySlip(response.data);
    } catch (error) {
      console.error('Error fetching salary slip:', error);
      setSalarySlip(null);
    }
  };

  const handleDownloadSlip = async () => {
    setDownloadingSlip(true);
    try {
      const response = await payrollAPI.downloadSalarySlip(selectedMonth + 1, selectedYear);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `salary_slip_${monthNames[selectedMonth]}_${selectedYear}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading slip:', error);
      alert('Failed to download salary slip');
    } finally {
      setDownloadingSlip(false);
    }
  };

  const handlePreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Don't allow going beyond current month
    if (selectedYear === currentYear && selectedMonth >= currentMonth) {
      return;
    }
    
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const calculateNetPay = () => {
    if (!salaryData) return 0;
    return (
      (salaryData.baseSalary || 0) +
      (salaryData.bonus || 0) +
      (salaryData.allowances || 0) -
      (salaryData.deductions || 0) -
      (salaryData.tax || 0)
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/employee/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Salary</h1>
              <p className="text-sm text-gray-600">View your salary details and download slips</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Read-Only Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6 flex items-start gap-3">
          <Lock className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-medium text-yellow-900">Read-Only Information</p>
            <p className="text-sm text-yellow-700 mt-1">
              Salary information is confidential and cannot be edited. Please contact HR for any queries or discrepancies.
            </p>
          </div>
        </div>

        {/* Net Salary Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg p-8 text-white mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-green-100 text-sm mb-2">Current Net Salary</p>
              <h2 className="text-5xl font-bold">
                ${calculateNetPay().toLocaleString()}
              </h2>
              <p className="text-green-100 text-sm mt-2">Per Month</p>
            </div>
            <DollarSign size={64} className="text-green-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Earnings Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Earnings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Base Salary</span>
                <span className="font-semibold text-gray-900">
                  ${salaryData?.baseSalary?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Bonus</span>
                <span className="font-semibold text-gray-900">
                  ${salaryData?.bonus?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Allowances</span>
                <span className="font-semibold text-gray-900">
                  ${salaryData?.allowances?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-semibold text-gray-900">Total Earnings</span>
                <span className="font-bold text-green-600 text-lg">
                  ${(
                    (salaryData?.baseSalary || 0) +
                    (salaryData?.bonus || 0) +
                    (salaryData?.allowances || 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Deductions Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-red-100 rounded-lg">
                <TrendingDown className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Deductions</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold text-gray-900">
                  ${salaryData?.tax?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Insurance</span>
                <span className="font-semibold text-gray-900">
                  ${salaryData?.insurance?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Other Deductions</span>
                <span className="font-semibold text-gray-900">
                  ${salaryData?.otherDeductions?.toLocaleString() || '0'}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="font-semibold text-gray-900">Total Deductions</span>
                <span className="font-bold text-red-600 text-lg">
                  ${(
                    (salaryData?.tax || 0) +
                    (salaryData?.insurance || 0) +
                    (salaryData?.otherDeductions || 0)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Salary Breakdown Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Salary Structure</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Gross Salary</span>
              <span className="font-semibold text-gray-900">
                ${(
                  (salaryData?.baseSalary || 0) +
                  (salaryData?.bonus || 0) +
                  (salaryData?.allowances || 0)
                ).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-700">Total Deductions</span>
              <span className="font-semibold text-red-600">
                - ${(
                  (salaryData?.tax || 0) +
                  (salaryData?.insurance || 0) +
                  (salaryData?.otherDeductions || 0)
                ).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <span className="font-bold text-gray-900 text-lg">Net Salary</span>
              <span className="font-bold text-green-600 text-2xl">
                ${calculateNetPay().toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Salary Slips Section */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Salary Slips</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePreviousMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-gray-600" />
                  <span className="font-semibold text-lg">
                    {monthNames[selectedMonth]} {selectedYear}
                  </span>
                </div>
                <button
                  onClick={handleNextMonth}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  disabled={
                    selectedYear === new Date().getFullYear() &&
                    selectedMonth >= new Date().getMonth()
                  }
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {salarySlip ? (
              <div className="border rounded-lg p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-blue-100 rounded-lg">
                      <FileText className="text-blue-600" size={32} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Salary Slip - {monthNames[selectedMonth]} {selectedYear}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Generated on {new Date(salarySlip.generatedDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDownloadSlip}
                    disabled={downloadingSlip}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    <Download size={18} />
                    {downloadingSlip ? 'Downloading...' : 'Download PDF'}
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Gross Pay</p>
                    <p className="text-lg font-semibold text-gray-900">
                      ${salarySlip.grossPay?.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Deductions</p>
                    <p className="text-lg font-semibold text-red-600">
                      ${salarySlip.deductions?.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Net Pay</p>
                    <p className="text-lg font-semibold text-green-600">
                      ${salarySlip.netPay?.toLocaleString() || '0'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mt-1">
                      Paid
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No salary slip available for this month</p>
                <p className="text-sm text-gray-500 mt-2">
                  Salary slips are generated after month-end processing
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Need Help?</h3>
          <div className="space-y-2 text-sm text-blue-800">
            <p>• Salary is credited on the last working day of each month</p>
            <p>• Salary slips are available for download after month-end processing</p>
            <p>• For salary queries or discrepancies, please contact HR department</p>
            <p>• Keep your bank details updated to avoid payment delays</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeSalary;
