import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests if it exists
api.interceptors.request.use(
  (config) => {
    // Let Axios/browser set the multipart boundary automatically.
    // If we force a JSON content-type globally, file uploads will break.
    const isFormData = typeof FormData !== 'undefined' && config.data instanceof FormData;
    if (isFormData) {
      if (config.headers && 'Content-Type' in config.headers) {
        delete config.headers['Content-Type'];
      }
    } else if (config.data != null) {
      config.headers = config.headers || {};
      if (!config.headers['Content-Type']) {
        config.headers['Content-Type'] = 'application/json';
      }
    }

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
  register: (userData) => {
    return api.post('/auth/register', userData);
  },
  logout: () => api.post('/auth/logout'),
};

// Admin APIs
export const adminAPI = {
  createEmployee: (data) => api.post('/admin/employees', data),
  getEmployees: () => api.get('/employee'),
  dashboard: () => api.get('/admin/dashboard'),
};

// Employee Profile APIs
export const employeeAPI = {
  getProfile: () => api.get('/employee/me'),
  updateProfile: (data) => api.put('/employee/me', data),
  uploadProfilePhoto: (formData) => api.post('/employee/me/photo', formData, { headers: { 'Content-Type': undefined } }),
  uploadDocument: (formData) => api.post('/employee/documents', formData, { headers: { 'Content-Type': undefined } }),
};

// Attendance APIs
export const attendanceAPI = {
  checkIn: () => api.post('/attendance/check-in'),
  checkOut: () => api.post('/attendance/check-out'),
  getMyAttendance: (month, year) => api.get('/attendance/me', { params: { month, year } }),
  getTodayStatus: () => api.get('/attendance/today'),
  getMonthSummary: (month, year) => api.get('/attendance/summary', { params: { month, year } }),
};

// Leave APIs
export const leaveAPI = {
  applyLeave: (leaveData) => api.post('/leave', leaveData),
  getMyLeaves: () => api.get('/leave/me'),
  cancelLeave: (leaveId) => api.delete(`/leave/${leaveId}`),
  getLeaveBalance: () => api.get('/leave/balance'),
};

// Payroll/Salary APIs
export const payrollAPI = {
  getMySalary: () => api.get('/payroll/me'),
  getSalarySlip: (month, year) => api.get('/payroll/slip', { params: { month, year } }),
  downloadSalarySlip: (month, year) => api.get('/payroll/slip/download', {
    params: { month, year },
    responseType: 'blob',
  }),
};

export default api;
