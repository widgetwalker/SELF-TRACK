# 📱 Dashboard Quick Reference Guide

## 🚀 Quick Start

### Start Backend
```bash
cd backend
npm start
```

### Access Dashboards
- **Employee**: http://localhost:3000/3-dashboard/index.html
- **Admin**: http://localhost:3000/admin%20dashboard/index.html

---

## 👤 Employee Dashboard

### Demo Login
```
Email: demo@selftrack.com
Password: demo123
```

### Main Features

#### Dashboard Tab
- View pending/completed tasks
- Check leave balance
- See skills count
- Check productivity score
- Quick action buttons

#### Tasks Tab
- View all assigned tasks
- Update task status (Pending → In Progress → Completed)
- See task creation date
- Real-time task count

#### Leave Management Tab
- Click "+ Request Leave" to apply
- Fill start date, end date, reason
- System validates dates
- View leave history
- See approval status

#### Skills Tab
- Click "+ Add Skill"
- Enter skill name
- Select proficiency (1-5 stars)
- Click to edit or delete
- Skills persist in database

#### Analytics Tab
- Productivity score
- Task completion rate
- Work-life balance
- Visual progress bars

#### Notifications Tab
- View all notifications
- Task assignments
- Leave status updates
- Timestamps included

---

## 👨‍💼 Admin Dashboard

### Demo Login
```
Email: admin@selftrack.com
Password: admin123
```

### Main Features

#### Dashboard Tab
- Total employees count
- Active tasks count
- Pending leaves count
- Average team productivity
- Productivity overview chart
- Burnout risk assessment

#### Employees Tab
1. **Employee List (Left Panel)**
   - Shows all registered employees
   - Search by name or email
   - Click employee to view details

2. **Employee Details (Right Panel)**
   - **Profile Tab**: Name, email, role, join date, skills
   - **Leave History Tab**: All leaves, approve/reject pending
   - **Salary Tab**: Base, allowances, deductions, net salary
   - **Analytics Tab**: Productivity, completion rate, metrics

#### Task Management Tab
- Click "+ Assign New Task"
- Select employee from dropdown
- Enter task title
- Add description (optional)
- Submit
- Task appears in employee's dashboard instantly

#### Leave Requests Tab
- View all leave requests by status
- **Pending section**: Shows pending requests
- **Approved section**: Shows approved leaves
- **Rejected section**: Shows rejected leaves
- Click "✓" to approve (green button)
- Click "✕" to reject (red button)
- Notification sent to employee automatically

#### Analytics Tab
- Team productivity trend
- Burnout risk distribution
- Performance metrics

---

## 🔑 Key Shortcuts

### Navigation
- Click sidebar items to switch tabs
- No page reload between tabs
- Click active tab to stay on it

### Forms
- "+" button opens form
- "Cancel" or close to dismiss
- Submit saves to database
- Success message appears

### Employee Selection (Admin)
- Type in search box to filter
- Click employee name to select
- Details load on right side
- Click tabs to view different info

### Leave Approval (Admin)
- Green "✓" button approves
- Red "✕" button rejects
- Confirmation dialog appears
- Action completes with notification

---

## 📊 Data Fields

### Employee Profile
- Full Name
- Email
- Role (Employee/Admin)
- Join Date
- Skills (with levels)

### Task
- Title (required)
- Description
- Status (Pending/In Progress/Completed)
- Assigned To (employee ID)
- Created At
- Updated At

### Leave Request
- Start Date (required)
- End Date (required)
- Reason (required)
- Status (Pending/Approved/Rejected)
- Applied By (employee)
- Reviewed By (admin)

### Skill
- Name (required)
- Proficiency Level (1-5)

---

## ✅ Validation Rules

### Leave Application
- End date must be after start date
- Both dates required
- Reason required (min 5 chars)

### Skill Addition
- Skill name required
- Proficiency level 1-5 required

### Task Assignment
- Employee required
- Task title required
- Description optional

---

## 🎨 Visual Indicators

### Status Colors
- **Pending**: Orange badge
- **In Progress**: Blue badge
- **Completed**: Green badge
- **Approved**: Green badge
- **Rejected**: Red badge

### Notification Icons
- 📢 General notification
- ✓ Task assignment
- 📅 Leave status
- ⭐ Achievement
- ⚠️ Warning/Alert

---

## 🆘 Troubleshooting

### Dashboard Not Loading
1. Clear browser cache (Ctrl+Shift+Delete)
2. Refresh page (Ctrl+R)
3. Check if backend is running
4. Check network tab for errors

### Data Not Updating
1. Refresh the page
2. Log out and log back in
3. Check internet connection
4. Check browser console for errors

### Buttons Not Working
1. Check if you have correct permissions
2. Verify data is valid
3. Check browser console
4. Try refreshing the page

### Sidebar Disappeared
1. Refresh page
2. Check window width (might be collapsed on mobile)
3. Check CSS in browser DevTools

---

## 📱 Mobile Usage

### Portrait Mode
- Sidebar on top as navigation bar
- Content stacked vertically
- Touch-friendly buttons
- Swipe navigation

### Landscape Mode
- Sidebar visible on left
- Content adjusts to width
- All features accessible
- Better for forms

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Tab | Navigate between form fields |
| Enter | Submit form |
| Esc | Close dialog/form |
| Ctrl+R | Refresh page |

---

## 📞 Common Tasks

### As Employee

**Assign Task to Yourself**
- Tasks are auto-assigned by admin
- Only admin can assign tasks

**Request Time Off**
1. Click "Leave Management"
2. Click "+ Request Leave"
3. Select dates
4. Type reason
5. Click "Submit Request"

**Add a Skill**
1. Click "Skills"
2. Click "+ Add Skill"
3. Type skill name
4. Select proficiency level
5. Click "Add Skill"

**Update Task Status**
1. Click "Tasks"
2. Find task in list
3. Click status dropdown
4. Select new status
5. Changes save automatically

---

### As Admin

**View Employee Details**
1. Click "Employees"
2. Search or scroll for employee
3. Click employee name
4. Click tabs to view info

**Assign Task to Employee**
1. Click "Task Management"
2. Click "+ Assign New Task"
3. Select employee
4. Enter title
5. Add description (optional)
6. Click "Assign Task"

**Approve Leave Request**
1. Click "Leave Requests"
2. Find pending request
3. Click green "✓" button
4. Confirm in dialog
5. Employee notified

**Reject Leave Request**
1. Click "Leave Requests"
2. Find pending request
3. Click red "✕" button
4. Confirm in dialog
5. Employee notified

---

## 🔐 Account Info

### Employee Account
```
Email: demo@selftrack.com
Password: demo123
Role: Employee
```

### Admin Account
```
Email: admin@selftrack.com
Password: admin123
Role: Admin
```

### Create New Account
1. Go to login page
2. Click "Sign Up" tab
3. Enter details
4. Select role (Employee/Admin)
5. Click "Create Account"

---

## 📈 Performance Tips

- Refresh page if data seems stale
- Close unused browser tabs
- Clear cache if experiencing issues
- Use desktop for better experience
- Wired internet for faster performance

---

**Last Updated**: 2026-01-22
**Version**: 1.0.0
**Status**: 🟢 PRODUCTION READY
