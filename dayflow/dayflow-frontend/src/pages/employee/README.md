# Employee Dashboard - DayFlow HRMS

This folder contains all the employee-side pages for the DayFlow HRMS application.

## 📁 Folder Structure

```
src/pages/employee/
├── Profile.jsx       # Employee profile with editable and read-only fields
├── Attendance.jsx    # Check-in/out and attendance tracking
├── Leave.jsx         # Leave application and history
└── Salary.jsx        # Salary details and slip downloads (read-only)
```

## 🎯 Features Implemented

### 1. **Employee Dashboard** (`/employee/dashboard`)
- Landing page after login with 4 main tiles
- Quick stats: Today's status, working hours, leave balance
- Navigation to all 4 main sections
- Quick action buttons

### 2. **My Profile** (`/employee/profile`)
- **Editable Fields:**
  - Phone Number
  - Address
  - Profile Photo
  
- **Read-Only Fields:**
  - Full Name
  - Email
  - Employee ID
  - Job Title
  - Department
  - Manager
  - Date of Joining
  - **Salary Structure** (Base Salary, Bonus, Deductions, Net Pay)
  
- **Tabs:**
  - Personal Info
  - Work Info
  - Salary Info (completely read-only)
  - Documents (Resume, Government ID)

### 3. **My Attendance** (`/employee/attendance`)
- **Check-In/Check-Out:**
  - One-click check-in and check-out buttons
  - Real-time working hours calculation
  - Today's status display
  
- **Working Hours Calculation:**
  ```
  Working Hours = Check-Out Time - Check-In Time
  ```
  
- **Auto Status Assignment:**
  - More than 8 hours → **Present**
  - 4-8 hours → **Half-day**
  - 0 hours → **Absent**
  - Approved leave → **Leave**
  
- **Monthly Summary:**
  - Present days count
  - Half-days count
  - Absent days count
  - Total working days
  
- **Attendance History Table:**
  - Date, Check-In, Check-Out, Working Hours, Extra Hours, Status
  - Month navigation (Previous/Next)

### 4. **My Leaves** (`/employee/leaves`)
- **Leave Balance Cards:**
  - Paid Time Off (PTO)
  - Sick Leave
  - Total Used
  
- **Leave Application Form:**
  - Leave Type: Paid / Sick / Unpaid
  - Start Date → End Date
  - Reason for Leave
  - Attachment upload (for sick leave certificate)
  - Auto-calculation of leave duration
  
- **Leave History:**
  - Status badges: Pending / Approved / Rejected
  - View all past leave requests
  - Duration and applied date

### 5. **My Salary** (`/employee/salary`)
- **Completely Read-Only**
- **Salary Structure Display:**
  - Base Salary
  - Bonus
  - Allowances
  - Tax
  - Insurance
  - Other Deductions
  - Net Pay (calculated)
  
- **Salary Slips:**
  - Monthly salary slip viewer
  - Month navigation
  - Download salary slip as PDF
  - Status: Paid/Pending

## 🔐 Security & Access Control

- All pages check for authentication token
- Employee can only access their own data
- Salary information is read-only
- Role-based access prevents viewing admin features
- Auto-redirect to login if token expires

## 🎨 UI/UX Features

- Clean, professional dashboard design
- Responsive layout (mobile, tablet, desktop)
- Color-coded status badges
- Smooth transitions and hover effects
- Loading states
- Error handling with user-friendly messages
- Modal dialogs for forms
- Icons from `lucide-react`

## 🔌 API Integration

All data is fetched dynamically from the backend using the API utility (`src/lib/api.js`):

- `employeeAPI` - Profile management
- `attendanceAPI` - Check-in/out, attendance records
- `leaveAPI` - Leave applications, balance
- `payrollAPI` - Salary details, slips

## 🚀 Navigation Flow

```
Login → Employee Dashboard
         ├── My Profile → Edit/View personal info
         ├── My Attendance → Check-in/out, view records
         ├── My Leaves → Apply leave, view history
         └── My Salary → View salary, download slips
```

## 📝 Important Notes

1. **Salary fields are completely read-only** - employees cannot edit any salary information
2. **Only phone, address, and photo are editable** in the profile
3. **Attendance status is auto-calculated** based on working hours
4. **Leave requests default to "Pending"** status until HR approves
5. All **components use Tailwind CSS** for styling

## 🛠️ Components Used

### Reusable Components
- `DashboardCard` - Main dashboard tile
- `StatCard` - Statistics display card
- `EmployeeNavbar` - Navigation bar with logout

### Icons (lucide-react)
- User, Clock, Calendar, DollarSign
- LogIn, LogOut, CheckCircle, XCircle
- Upload, Download, Edit, Save, etc.

## 🎯 Design Principles

- **Mobile-first responsive design**
- **Accessibility-friendly**
- **Consistent color scheme**
- **Clear visual hierarchy**
- **Intuitive navigation**
- **Professional business look**

---

## How to Use

1. After login, employee lands on `/employee/dashboard`
2. Click any of the 4 tiles to navigate to specific sections
3. Use the back arrow to return to dashboard
4. Logout button available on all pages

## Environment Variables

Add to `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

---

**Built with React + Vite + Tailwind CSS**
