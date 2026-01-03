# 📊 Employee Dashboard - Quick Reference

## 🎨 Color Scheme

| Feature | Gradient | Icon Color |
|---------|----------|------------|
| Profile | `from-blue-500 to-blue-600` | Blue |
| Attendance | `from-green-500 to-green-600` | Green |
| Leaves | `from-purple-500 to-purple-600` | Purple |
| Salary | `from-orange-500 to-orange-600` | Orange |

## 📄 Page Routes

| Page | Route | Access Level |
|------|-------|--------------|
| Employee Dashboard | `/employee/dashboard` | Employee Only |
| My Profile | `/employee/profile` | Employee Only |
| My Attendance | `/employee/attendance` | Employee Only |
| My Leaves | `/employee/leaves` | Employee Only |
| My Salary | `/employee/salary` | Employee Only |

## 🔒 Field Access Control

### Profile Page

| Field | Editable | Read-Only | Notes |
|-------|----------|-----------|-------|
| Name | ❌ | ✅ | Contact admin to change |
| Email | ❌ | ✅ | Contact admin to change |
| Phone | ✅ | ❌ | Employee can edit |
| Address | ✅ | ❌ | Employee can edit |
| Profile Photo | ✅ | ❌ | Employee can upload |
| Job Title | ❌ | ✅ | Admin controlled |
| Department | ❌ | ✅ | Admin controlled |
| Manager | ❌ | ✅ | Admin controlled |
| Date of Joining | ❌ | ✅ | Admin controlled |
| Base Salary | ❌ | ✅ | Completely read-only |
| Bonus | ❌ | ✅ | Completely read-only |
| Deductions | ❌ | ✅ | Completely read-only |
| Net Pay | ❌ | ✅ | Auto-calculated |

### Attendance Page

| Action | Available |
|--------|-----------|
| Check In | ✅ Once per day |
| Check Out | ✅ After check-in |
| Edit Check-in/out | ❌ Contact HR |
| View History | ✅ All months |

### Leave Page

| Action | Available |
|--------|-----------|
| Apply Leave | ✅ Any time |
| Cancel Pending Leave | ✅ Before approval |
| Edit Approved Leave | ❌ Contact HR |
| View History | ✅ All leaves |

### Salary Page

| Action | Available |
|--------|-----------|
| View Salary | ✅ Current month |
| Download Slip | ✅ Past months |
| Edit Salary | ❌ Never - Contact HR |

## 📱 Status Indicators

### Attendance Status

| Working Hours | Status | Color |
|---------------|--------|-------|
| > 8 hours | Present | 🟢 Green |
| 4-8 hours | Half-day | 🟡 Yellow |
| 0 hours | Absent | 🔴 Red |
| Leave approved | Leave | 🔵 Blue |

### Leave Status

| Status | Color | Meaning |
|--------|-------|---------|
| Pending | 🟡 Yellow | Waiting for approval |
| Approved | 🟢 Green | Leave granted |
| Rejected | 🔴 Red | Leave denied |

## 🔢 Salary Calculation

```
Gross Salary = Base Salary + Bonus + Allowances

Total Deductions = Tax + Insurance + Other Deductions

Net Salary = Gross Salary - Total Deductions
```

## 📅 Leave Types

| Type | Description | Max Days |
|------|-------------|----------|
| Paid Time Off | Full salary paid | 24/year |
| Sick Leave | Medical certificate required | 7/year |
| Unpaid Leave | No salary paid | Unlimited |

## 🎯 Working Hours Logic

```javascript
// Check-in: Record current time
checkInTime = new Date()

// Check-out: Calculate duration
checkOutTime = new Date()
workingHours = (checkOutTime - checkInTime) / (1000 * 60 * 60)

// Determine status
if (workingHours > 8) status = "Present"
else if (workingHours >= 4) status = "Half-day"
else status = "Absent"
```

## 🔐 Security Rules

1. ✅ Employee can ONLY see their own data
2. ✅ Salary fields are NEVER editable
3. ✅ Token expiration redirects to login
4. ✅ All API calls include authentication
5. ✅ Role-based access control enforced

## 📊 Dashboard Metrics

| Metric | Location | Updates |
|--------|----------|---------|
| Today's Status | Dashboard | Real-time |
| Working Hours | Dashboard | After check-out |
| Leave Balance | Dashboard | After approval/rejection |
| Present Days | Attendance | Monthly |
| Half Days | Attendance | Monthly |
| Absent Days | Attendance | Monthly |

## 🎨 Component Library

| Component | Location | Purpose |
|-----------|----------|---------|
| `DashboardCard` | `components/employee/` | Dashboard tiles |
| `StatCard` | `components/employee/` | Statistics display |
| `EmployeeNavbar` | `components/employee/` | Navigation bar |
| `ProtectedRoute` | `components/` | Route protection |

## 💡 UI Patterns

### Card Structure
```jsx
<div className="bg-white rounded-xl shadow-lg p-6">
  {/* Header */}
  <div className="border-b pb-4 mb-4">
    <h2>Title</h2>
  </div>
  
  {/* Content */}
  <div>
    {/* Content here */}
  </div>
</div>
```

### Status Badge
```jsx
<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
  <Icon size={16} />
  Status Text
</span>
```

### Action Button
```jsx
<button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
  <Icon size={18} />
  Button Text
</button>
```

## 📱 Responsive Breakpoints

| Breakpoint | Width | Grid Columns |
|------------|-------|--------------|
| Mobile | < 640px | 1 column |
| Tablet | 640px - 1024px | 2 columns |
| Desktop | > 1024px | 2-4 columns |

## 🎯 Key Features Checklist

- ✅ 4-tile dashboard with live data
- ✅ Profile editing (limited fields)
- ✅ Check-in/out attendance system
- ✅ Automatic working hours calculation
- ✅ Leave application with status tracking
- ✅ Read-only salary information
- ✅ Salary slip downloads
- ✅ Role-based access control
- ✅ Responsive mobile design
- ✅ Professional UI/UX

---

**Last Updated:** January 2026  
**Version:** 1.0.0  
**Framework:** React + Vite + Tailwind CSS
