# Comprehensive Testing Guide - Self-Track

## Overview
This guide provides step-by-step instructions for testing all features and fixes implemented in the Self-Track application.

---

## Prerequisites
- Both backend and frontend servers are running
- Backend: http://localhost:5000
- Frontend: http://localhost:3000
- Browser: Chrome, Firefox, or Edge (latest version recommended)

---

## 1. Authentication Testing

### Test 1.1: Login Functionality
**Steps:**
1. Navigate to http://localhost:3000
2. If logged out, you should see the login page
3. Enter credentials:
   - Email: `employee@example.com`
   - Password: `password123`
4. Click "Login" button
5. You should be redirected to the dashboard

**Expected Result:** ✅ Dashboard loads with personalized greeting

### Test 1.2: Logout Functionality
**Steps:**
1. From dashboard, click the user avatar in top-right corner
2. Select "Logout" option
3. You should be redirected to login page

**Expected Result:** ✅ Auth token is cleared, user is logged out

### Test 1.3: Multi-Tab Authentication Sync
**Steps:**
1. Open the application in two browser tabs
2. Log in on Tab 1
3. Without refreshing, check if Tab 2 detects login (storage event listener)
4. Open a new tab (Tab 3) while logged in on Tab 1
5. Tab 3 should automatically have auth token from localStorage

**Expected Result:** ✅ All tabs stay synchronized with auth state

### Test 1.4: Auto-Login Persistence
**Steps:**
1. Log in on the application
2. Close the browser completely
3. Reopen the browser and navigate to http://localhost:3000
4. You should remain logged in

**Expected Result:** ✅ Auth token persists in localStorage

---

## 2. Dashboard Testing

### Test 2.1: Dashboard Loading
**Steps:**
1. Log in to the application
2. Wait for dashboard to fully load
3. Observe the dashboard layout with welcome message, quick stats, and action buttons

**Expected Result:** ✅ Dashboard displays with:
- Personalized welcome message
- Quick statistics cards (Tasks, Leaves, Skills)
- Performance overview
- Quick action buttons

### Test 2.2: Quick Action Button Navigation
**Steps:**
1. On the dashboard, locate the quick action buttons:
   - 📝 Create Task
   - 🏖️ Request Leave
   - ⭐ Update Skills
   - 📊 View Analytics
2. Click "📝 Create Task" button
3. Verify navigation to Tasks page
4. Click "🏖️ Request Leave" button
5. Verify navigation to Leaves page
6. Click "⭐ Update Skills" button
7. Verify navigation to Skills page
8. Click "📊 View Analytics" button
9. Verify navigation to Performance Insights page

**Expected Result:** ✅ All buttons navigate to correct pages without errors

### Test 2.3: Dashboard Animations
**Steps:**
1. Open dashboard
2. Observe page transition animation (smooth fade/slide in)
3. Click different navigation links
4. Observe smooth page transitions

**Expected Result:** ✅ Framer Motion animations display smoothly

---

## 3. Tasks Page Testing

### Test 3.1: View Tasks
**Steps:**
1. Navigate to Tasks page (via dashboard or sidebar)
2. Wait for tasks to load
3. Verify tasks display with:
   - Task title
   - Description
   - Priority badge (High/Medium/Low)
   - Status badge (To Do/In Progress/Done)
   - Due date

**Expected Result:** ✅ Tasks list displays with all information

### Test 3.2: Create New Task
**Steps:**
1. Click "New Task" button on Tasks page
2. Fill in the form:
   - Title: "Test Task"
   - Description: "Testing task creation"
   - Priority: "High"
   - Due Date: Select a future date
3. Click "Create Task" button
4. Observe the new task appears in the list

**Expected Result:** ✅ New task created and displayed in list

### Test 3.3: Update Task Status
**Steps:**
1. Click on a task in the list
2. Click status dropdown
3. Change status from "To Do" → "In Progress" → "Done"
4. Observe status updates immediately

**Expected Result:** ✅ Task status updates without page reload

### Test 3.4: Filter Tasks by Status
**Steps:**
1. On Tasks page, locate filter buttons (if available)
2. Click filter options
3. View filtered results

**Expected Result:** ✅ Tasks filter correctly based on selection

---

## 4. Leaves Page Testing

### Test 4.1: View Existing Leaves
**Steps:**
1. Navigate to Leaves page
2. Verify page displays list of previous leave requests
3. Check each leave shows:
   - Start date
   - End date
   - Reason
   - Status (Approved/Pending/Rejected)
   - Leave type (Casual/Sick/Paid)

**Expected Result:** ✅ Leave history displays correctly

### Test 4.2: Request New Leave
**Steps:**
1. Click "Request Leave" button
2. A form should appear with fields:
   - Leave Type (dropdown)
   - Start Date (date picker)
   - End Date (date picker)
   - Reason (text area)
3. Fill in the form:
   - Leave Type: "Casual"
   - Start Date: Select 2 days from now
   - End Date: Select 3 days from now
   - Reason: "Personal appointment"
4. Click "Submit Request" button
5. Success message should appear

**Expected Result:** ✅ Leave request created and added to list with "Pending" status

### Test 4.3: Form Validation
**Steps:**
1. Click "Request Leave" button
2. Try submitting without filling any fields
3. Try selecting end date before start date

**Expected Result:** ✅ Appropriate validation errors display

### Test 4.4: Responsive Design on Mobile
**Steps:**
1. Open DevTools (F12)
2. Toggle device toolbar to mobile view (375px width)
3. Navigate to Leaves page
4. Verify form is responsive and usable on mobile

**Expected Result:** ✅ Leave form and list display properly on mobile

---

## 5. Skills Page Testing

### Test 5.1: View Skills
**Steps:**
1. Navigate to Skills page
2. Verify list of existing skills displays with:
   - Skill name
   - Proficiency level (Beginner/Intermediate/Advanced/Expert)
   - Years of experience
   - Progress bar

**Expected Result:** ✅ Skills list displays with all details

### Test 5.2: Add New Skill
**Steps:**
1. Click "Add Skill" button
2. A form should appear with:
   - Skill Name (text input)
   - Proficiency Level (dropdown)
3. Fill in:
   - Skill Name: "TypeScript"
   - Proficiency: "Advanced"
4. Click "Add Skill" button
5. New skill should appear in the list

**Expected Result:** ✅ New skill added and displayed in list

### Test 5.3: Update Skill Proficiency
**Steps:**
1. Click on an existing skill
2. Click "Edit" button
3. Change proficiency level
4. Click "Update Skill"
5. Verify proficiency updates

**Expected Result:** ✅ Skill proficiency updates successfully

### Test 5.4: Remove Skill
**Steps:**
1. Hover over a skill in the list
2. Click the delete/remove button
3. Confirm deletion
4. Verify skill is removed from list

**Expected Result:** ✅ Skill removed from the list

---

## 6. Admin Dashboard Testing

### Test 6.1: Admin Access Control
**Steps:**
1. Log out current user
2. Log in with admin account:
   - Email: `admin@example.com`
   - Password: `admin123`
3. Look for "Admin Dashboard" option in navigation

**Expected Result:** ✅ Admin can access admin dashboard

### Test 6.2: User Access Denial
**Steps:**
1. Log in as regular employee (not admin)
2. Try accessing `/admin` URL directly
3. Or look for Admin Dashboard in navigation (should not be visible)

**Expected Result:** ✅ Access denied message displays for non-admin users

### Test 6.3: Admin Dashboard Content
**Steps:**
1. Log in as admin
2. Navigate to Admin Dashboard
3. Verify tabs and sections are visible:
   - Overview tab with stats (users, tasks, leaves)
   - Users management
   - Performance metrics
   - System health

**Expected Result:** ✅ All admin sections display correctly

---

## 7. Navigation Testing

### Test 7.1: Sidebar Navigation
**Steps:**
1. On any page, verify sidebar shows menu items:
   - Dashboard
   - Tasks
   - Leaves
   - Skills
   - Performance Insights
   - (Admin Dashboard - if admin)
2. Click each menu item
3. Verify page navigation works

**Expected Result:** ✅ All navigation items work correctly

### Test 7.2: Mobile Navigation
**Steps:**
1. Open DevTools (F12)
2. Toggle device toolbar to mobile view
3. Verify hamburger menu appears
4. Click hamburger menu
5. Navigate using mobile menu

**Expected Result:** ✅ Mobile navigation displays and functions

### Test 7.3: Active Navigation Indicator
**Steps:**
1. Navigate to different pages
2. Verify current page is highlighted in navigation

**Expected Result:** ✅ Active page shows visual indication

---

## 8. CSS and Styling Testing

### Test 8.1: Dashboard Styling
**Steps:**
1. Open Dashboard page
2. Verify:
   - Cards have proper spacing
   - Colors match brand guidelines
   - Responsive grid layout
   - Action buttons are styled consistently

**Expected Result:** ✅ Dashboard styling looks professional and polished

### Test 8.2: Form Styling
**Steps:**
1. Open any page with forms (Leaves, Skills, Tasks)
2. Verify:
   - Input fields are properly styled
   - Buttons have hover/active states
   - Labels are clear
   - Error messages are visible

**Expected Result:** ✅ Forms are well-styled and user-friendly

### Test 8.3: Responsive Design
**Steps:**
1. Open DevTools
2. Test at different breakpoints:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1200px
3. Verify layout adapts appropriately

**Expected Result:** ✅ All pages are responsive across devices

### Test 8.4: Dark/Light Mode (if implemented)
**Steps:**
1. If theme toggle exists, click it
2. Verify all colors change appropriately
3. Verify text remains readable

**Expected Result:** ✅ Theme switching works correctly

---

## 9. Performance & Error Handling Testing

### Test 9.1: Loading States
**Steps:**
1. Navigate between pages
2. Observe loading indicators appear while data loads
3. Wait for content to load

**Expected Result:** ✅ Loading spinners/skeletons display smoothly

### Test 9.2: Error Handling
**Steps:**
1. Simulate network error by:
   - Stopping backend server while fetching data
   - OR Opening DevTools Network tab and throttling to "Offline"
2. Attempt to load data
3. Verify error message displays

**Expected Result:** ✅ User-friendly error message appears

### Test 9.3: Success Notifications
**Steps:**
1. Create a new task/leave/skill
2. Submit the form
3. Verify success message/toast notification appears

**Expected Result:** ✅ Success feedback provided to user

---

## 10. Browser Console Testing

### Test 10.1: Check for Console Errors
**Steps:**
1. Open DevTools (F12)
2. Go to Console tab
3. Navigate through all pages
4. Create new items
5. Submit forms

**Expected Result:** ✅ No critical errors in console (minor warnings okay)

### Test 10.2: Check Network Requests
**Steps:**
1. Open DevTools Network tab
2. Navigate through application
3. Verify API requests are successful (200, 201 status codes)
4. Check response times are reasonable (<2 seconds)

**Expected Result:** ✅ All API requests succeed with proper status codes

---

## 11. Cross-Browser Testing

### Test 11.1: Chrome
**Steps:**
1. Open application in Chrome
2. Run through all tests above

**Expected Result:** ✅ All features work in Chrome

### Test 11.2: Firefox
**Steps:**
1. Open application in Firefox
2. Test critical features:
   - Login
   - Dashboard
   - Create task
   - Request leave

**Expected Result:** ✅ Critical features work in Firefox

### Test 11.3: Edge
**Steps:**
1. Open application in Edge
2. Test critical features

**Expected Result:** ✅ Critical features work in Edge

---

## 12. Summary Checklist

- [ ] Authentication (login, logout, persistence, multi-tab sync)
- [ ] Dashboard loading and quick actions
- [ ] Tasks CRUD operations
- [ ] Leaves request creation
- [ ] Skills management
- [ ] Admin dashboard access control
- [ ] Navigation across all pages
- [ ] Responsive design on mobile/tablet/desktop
- [ ] CSS styling and visual polish
- [ ] Loading and error states
- [ ] API integration and network requests
- [ ] Cross-browser compatibility
- [ ] Console errors (none critical)
- [ ] Performance (page loads fast, smooth animations)

---

## Known Issues & Workarounds

(Add any known issues discovered during testing)

---

## Quick Fixes Reference

### Issue: Quick action buttons not navigating
**Fix Applied:** Added onClick handlers with navigate() in DashboardPage.jsx
**Status:** ✅ Fixed

### Issue: Auth token not syncing across tabs
**Fix Applied:** Added storage event listener in App.jsx
**Status:** ✅ Fixed

### Issue: LeavesPage not functional
**Fix Applied:** Implemented complete LeavesPage with request leave functionality
**Status:** ✅ Fixed

### Issue: SkillsPage not functional
**Fix Applied:** Implemented complete SkillsPage with add skill functionality
**Status:** ✅ Fixed

### Issue: AdminDashboardPage access control
**Fix Applied:** Implemented proper role-based access control
**Status:** ✅ Fixed

### Issue: Missing CSS styles
**Fix Applied:** Added comprehensive CSS styles to DashboardPage.css
**Status:** ✅ Fixed

---

## Testing Environment Setup

### Start Backend Server
```bash
cd backend
npm install
npm start
```

### Start Frontend Server
```bash
cd frontend
npm install
npm start
```

### Verify Servers Running
- Backend: http://localhost:5000/api/health
- Frontend: http://localhost:3000

---

## Test Credentials

**Regular Employee:**
- Email: `employee@example.com`
- Password: `password123`

**Admin User:**
- Email: `admin@example.com`
- Password: `admin123`

---

## Contact & Support

For testing issues or bugs found:
1. Check browser console for error messages
2. Check backend logs for API errors
3. Verify both servers are running
4. Clear browser cache (Ctrl+Shift+Delete) and retry
5. Restart servers if issues persist

---

**Testing Guide Version:** 1.0
**Last Updated:** January 28, 2026
**Status:** Complete ✅
