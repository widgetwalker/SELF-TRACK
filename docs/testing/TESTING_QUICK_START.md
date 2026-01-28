# Testing Quick Start Guide

## 🚀 Quick Start

### Check Servers

**Backend Server Status:**
```powershell
Get-Process | Where-Object {$_.ProcessName -match "node|npm"}
# Look for running node process on port 5000
```

**Frontend Server Status:**
- Verify http://localhost:3000 is accessible in browser

### Login Credentials

| Role | Email | Password |
|------|-------|----------|
| Employee | employee@example.com | password123 |
| Admin | admin@example.com | admin123 |

---

## ✅ What to Test (Priority Order)

### High Priority (Test First)
1. **Login** - Use employee@example.com / password123
2. **Dashboard** - Verify welcome message and stats display
3. **Quick Action Buttons** - Click all 4 buttons and verify navigation
4. **Multi-Tab Auth** - Open 2 tabs, login on one, check auth on the other

### Medium Priority
5. **Create Task** - Click "Create Task" → fill form → submit
6. **Request Leave** - Click "Request Leave" → fill form → submit
7. **Add Skill** - Click "Add Skill" → fill form → submit
8. **Admin Access** - Login as admin, verify admin dashboard visible

### Standard Priority
9. **Mobile Responsive** - Open DevTools (F12) → Toggle mobile view
10. **Cross-Browser** - Test in Chrome, Firefox, Edge
11. **Error Handling** - Check browser console (F12 → Console tab)
12. **Navigation** - Click through all sidebar items

---

## 🔍 Critical Fixes to Verify

### 1. Dashboard Buttons Work ✅
```javascript
// These are implemented:
<button onClick={() => navigate('/tasks')}>📝 Create Task</button>
<button onClick={() => navigate('/leaves')}>🏖️ Request Leave</button>
<button onClick={() => navigate('/skills')}>⭐ Update Skills</button>
<button onClick={() => navigate('/performance')}>📊 View Analytics</button>
```

### 2. Multi-Tab Auth Sync ✅
```javascript
// This is implemented:
window.addEventListener('storage', handleStorageChange);
```

### 3. LeavesPage Complete ✅
- Form fields: Leave Type, Start Date, End Date, Reason
- Submit button creates new leave request
- List displays all leaves

### 4. SkillsPage Complete ✅
- Form fields: Skill Name, Proficiency Level
- Submit button adds new skill
- List displays all skills with proficiency

### 5. AdminDashboardPage Secure ✅
- Only accessible to admin role
- Shows "Access Denied" for regular users

### 6. Responsive CSS ✅
- Mobile: 375px and up
- Tablet: 768px and up
- Desktop: 1200px and up

---

## 📋 Quick Test Checklist

**Authentication:**
- [ ] Login works
- [ ] Logout works
- [ ] Multi-tab sync works
- [ ] Auto-login on refresh works

**Dashboard:**
- [ ] Dashboard loads
- [ ] All 4 quick action buttons navigate correctly
- [ ] Stats cards display

**Features:**
- [ ] Can create task
- [ ] Can request leave
- [ ] Can add skill
- [ ] Admin can access admin panel
- [ ] User cannot access admin panel

**Design:**
- [ ] Desktop layout looks good
- [ ] Mobile layout is responsive
- [ ] No console errors
- [ ] Animations are smooth

---

## 🛠️ Troubleshooting

### Issue: Cannot login
**Solution:** 
1. Check backend is running: `Get-Process | Where-Object {$_.ProcessName -match "node"}`
2. Check credentials are correct (employee@example.com / password123)
3. Check browser console (F12) for errors

### Issue: Buttons don't navigate
**Solution:** 
1. Check React Router is imported
2. Check navigate function is used (not href)
3. Routes must be configured in App.jsx

### Issue: Leaves/Skills pages not showing
**Solution:**
1. Check pages are imported in App.jsx
2. Check routes are configured
3. Check navigation links point to correct paths

### Issue: Admin dashboard shows "Access Denied"
**Solution:**
1. Login with admin account (admin@example.com / admin123)
2. Check auth token has role: "admin"
3. Check AdminDashboardPage checks `auth?.role === 'admin'`

### Issue: Mobile view doesn't look right
**Solution:**
1. Check CSS media queries exist
2. Verify breakpoints: @media (max-width: 768px) for mobile
3. Check flex/grid layouts for mobile

---

## 📍 File Locations

| Feature | File | Status |
|---------|------|--------|
| Dashboard Buttons | frontend/src/pages/DashboardPage.jsx | ✅ |
| Multi-Tab Sync | frontend/src/App.jsx | ✅ |
| Leaves Page | frontend/src/pages/LeavesPage.jsx | ✅ |
| Skills Page | frontend/src/pages/SkillsPage.jsx | ✅ |
| Admin Dashboard | frontend/src/pages/AdminDashboardPage.jsx | ✅ |
| Styling | frontend/src/pages/DashboardPage.css | ✅ |

---

## 🔗 Important URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Backend Health:** http://localhost:5000/api/health

---

## ⏱️ Expected Test Times

- Login/Logout: 2-3 minutes
- Dashboard Navigation: 5-10 minutes
- CRUD Operations (Tasks/Leaves/Skills): 10-15 minutes
- Responsive Design: 5-10 minutes
- Error Handling: 5-10 minutes
- **Total: 30-50 minutes**

---

## 💡 Tips

1. **Test in order** - Start with authentication, then basic features
2. **Check console** - Open DevTools (F12) and check Console for errors
3. **Test mobile** - DevTools → Ctrl+Shift+M to toggle mobile view
4. **Clear cache** - If pages look wrong, clear cache: Ctrl+Shift+Delete
5. **Restart servers** - If stuck, stop and restart backend/frontend
6. **Check network** - DevTools → Network tab to verify API calls succeed

---

## 📞 Support

**Full Testing Guide:** See `COMPREHENSIVE_TESTING_GUIDE.md`
**Verification Report:** See `FIXES_VERIFICATION_REPORT.md`

**Questions?** Check console for error messages and verify both servers are running.

---

**Version:** 1.0
**Date:** January 28, 2026
**Status:** Ready for Testing ✅
