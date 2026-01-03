# 🎯 Employee Dashboard Setup Guide

## 📦 Installation Steps

### 1. Install Required Dependencies

The project already has most dependencies. You need to add `axios` for API calls:

```bash
cd dayflow-frontend
npm install axios
```

### 2. Create Environment File

Create a `.env` file in the `dayflow-frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Verify Tailwind CSS Configuration

Make sure `tailwind.config.js` includes the employee folder:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 🗂️ Complete File Structure Created

```
dayflow-frontend/
├── src/
│   ├── lib/
│   │   └── api.js                    ✅ API configuration & endpoints
│   ├── components/
│   │   └── employee/
│   │       ├── Navbar.jsx            ✅ Employee navigation bar
│   │       ├── DashboardCard.jsx     ✅ Reusable dashboard tile
│   │       └── StatCard.jsx          ✅ Statistics card component
│   ├── pages/
│   │   ├── EmployeeDashboard.jsx     ✅ Main dashboard with 4 tiles
│   │   └── employee/
│   │       ├── Profile.jsx           ✅ Employee profile (editable + read-only)
│   │       ├── Attendance.jsx        ✅ Check-in/out & attendance tracking
│   │       ├── Leave.jsx             ✅ Leave application & history
│   │       ├── Salary.jsx            ✅ Salary details (read-only)
│   │       └── README.md             ✅ Documentation
│   └── App.jsx                        ✅ Updated with employee routes
└── .env                               ⚠️ Create this file
```

## 🚀 Running the Application

### Start Frontend

```bash
cd dayflow-frontend
npm run dev
```

The app will run on `http://localhost:5173`

### Start Backend (in separate terminal)

```bash
cd dayflow-backend
npm run dev
```

The API will run on `http://localhost:5000`

## 🔐 Login & Navigation

### After Login:
1. Employee credentials will be authenticated
2. Token stored in localStorage
3. Redirect to `/employee/dashboard`

### Dashboard Navigation:
- **My Profile** → `/employee/profile`
- **My Attendance** → `/employee/attendance`
- **My Leaves** → `/employee/leaves`
- **My Salary** → `/employee/salary`

## 📋 Features Summary

### ✅ My Profile
- **Editable:** Phone, Address, Profile Photo
- **Read-Only:** Name, Email, Job Title, Department, Salary Info
- **Tabs:** Personal Info, Work Info, Salary Info, Documents

### ✅ My Attendance
- Check-In/Check-Out buttons
- Auto-calculate working hours
- Status: Present (>8hrs), Half-day (4-8hrs), Absent (0hrs)
- Monthly summary & history

### ✅ My Leaves
- Apply leave with type (Paid/Sick/Unpaid)
- Date range selection
- Reason & attachment upload
- Leave balance display
- History with status (Pending/Approved/Rejected)

### ✅ My Salary
- **All Read-Only**
- Base Salary, Bonus, Allowances
- Tax, Insurance, Deductions
- Net Pay calculation
- Download monthly salary slips

## 🎨 Design Features

- **Responsive Design** - Mobile, Tablet, Desktop
- **Modern UI** - Gradient cards, smooth transitions
- **Color-Coded Status** - Visual status indicators
- **Icons** - lucide-react icons throughout
- **Professional Look** - Business-appropriate styling

## 🔌 API Endpoints Expected

Your backend should have these endpoints:

### Auth
- `POST /api/auth/login`
- `POST /api/auth/register`

### Employee Profile
- `GET /api/employee/profile`
- `PUT /api/employee/profile`
- `POST /api/employee/profile/photo`

### Attendance
- `POST /api/attendance/checkin`
- `POST /api/attendance/checkout`
- `GET /api/attendance/my?month=1&year=2026`
- `GET /api/attendance/today`
- `GET /api/attendance/summary?month=1&year=2026`

### Leave
- `POST /api/leave/apply`
- `GET /api/leave/my`
- `GET /api/leave/balance`
- `DELETE /api/leave/:id`

### Payroll
- `GET /api/payroll/my`
- `GET /api/payroll/slip?month=1&year=2026`
- `GET /api/payroll/slip/download?month=1&year=2026`

## 🛠️ Troubleshooting

### Issue: API calls failing
**Solution:** Check that backend is running and `.env` file has correct URL

### Issue: Routes not working
**Solution:** Verify `App.jsx` has all employee routes

### Issue: Styles not applying
**Solution:** Make sure Tailwind is configured and CSS is imported in `main.jsx`

### Issue: Icons not showing
**Solution:** Verify `lucide-react` is installed: `npm install lucide-react`

## 📱 Testing Checklist

- [ ] Login redirects to employee dashboard
- [ ] All 4 dashboard tiles navigate correctly
- [ ] Profile edit works (phone, address, photo)
- [ ] Salary fields are read-only
- [ ] Check-in button creates attendance
- [ ] Check-out calculates working hours
- [ ] Leave application submits successfully
- [ ] Leave history displays with correct status
- [ ] Salary page shows all breakdown
- [ ] Logout clears session and redirects to login
- [ ] Responsive design works on mobile
- [ ] Back buttons navigate correctly

## 🎯 Next Steps

1. **Backend Integration:** Ensure all API endpoints match
2. **Authentication:** Test login flow and token management
3. **Data Validation:** Add form validation
4. **Error Handling:** Improve error messages
5. **Loading States:** Add skeletons for better UX
6. **Testing:** Write unit and integration tests

## 📞 Support

For issues or questions:
1. Check the console for errors
2. Verify API endpoints in backend
3. Check network tab for failed requests
4. Review `src/pages/employee/README.md` for feature details

---

**Built with ❤️ using React, Vite, Tailwind CSS, and lucide-react**
