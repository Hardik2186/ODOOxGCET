import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

// Employee Profile APIs
export const employeeAPI = {
  getProfile: () => api.get('/employee/profile'),
  updateProfile: (data) => api.put('/employee/profile', data),
  uploadProfilePhoto: (formData) => api.post('/employee/profile/photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  uploadDocument: (formData) => api.post('/employee/documents', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
};

// Attendance APIs
export const attendanceAPI = {
  checkIn: () => api.post('/attendance/checkin'),
  checkOut: () => api.post('/attendance/checkout'),
  getMyAttendance: (month, year) => api.get('/attendance/my', { params: { month, year } }),
  getTodayStatus: () => api.get('/attendance/today'),
  getMonthSummary: (month, year) => api.get('/attendance/summary', { params: { month, year } }),
};

// Leave APIs
export const leaveAPI = {
  applyLeave: (leaveData) => api.post('/leave/apply', leaveData),
  getMyLeaves: () => api.get('/leave/my'),
  cancelLeave: (leaveId) => api.delete(`/leave/${leaveId}`),
  getLeaveBalance: () => api.get('/leave/balance'),
};

// Payroll/Salary APIs
export const payrollAPI = {
  getMySalary: () => api.get('/payroll/my'),
  getSalarySlip: (month, year) => api.get('/payroll/slip', { params: { month, year } }),
  downloadSalarySlip: (month, year) => api.get('/payroll/slip/download', {
    params: { month, year },
    responseType: 'blob',
  }),
};

export default api;
