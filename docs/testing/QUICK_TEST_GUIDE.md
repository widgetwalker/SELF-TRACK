# 🧪 QUICK TEST - All Fixed Features

**Backend Status:** ✅ Running on http://localhost:5000

---

## Test Login/Register

### Test 1: Login as Employee
1. Go to http://localhost:3000 (after starting frontend)
2. Enter: `demo@selftrack.com` / `demo123`
3. Click "Login"
4. Should see Dashboard

### Test 2: Register as Admin
1. Click "Register" tab
2. Fill in:
   - Full Name: Your Name
   - Email: newadmin@test.com
   - Password: test123
   - Role: **Select "Admin"**
3. Click "Register"
4. Should see Admin Dashboard (look for Admin tab in navbar)

### Test 3: Register as Employee
1. Click "Register" tab
2. Fill in:
   - Full Name: Your Name
   - Email: newemployee@test.com
   - Password: test123
   - Role: **Select "Employee"**
3. Click "Register"
4. Should see regular Dashboard

---

## Test Logout

1. From any page, click the **user avatar** in top-right
2. Click **"Logout"**
3. Should return to login page
4. Auth is cleared from localStorage

---

## Test Quick Action Buttons

1. Go to Dashboard
2. Click each button:
   - **📝 Create Task** → Should go to /tasks page
   - **🏖️ Request Leave** → Should go to /leaves page
   - **⭐ Update Skills** → Should go to /skills page
   - **📊 View Analytics** → Should go to /performance page

---

## Test Request Leave

1. Click "Request Leave" (quick action or go to /leaves)
2. Click "Request Leave" button in the page
3. Fill form:
   - Leave Type: Select one
   - Start Date: Pick a future date
   - End Date: Pick a later date
   - Reason: Type reason
4. Click "Submit Request"
5. Should show success message
6. Should appear in the list below

---

## Test Add Skill

1. Click "Update Skills" (quick action or go to /skills)
2. Click "Add Skill" button
3. Fill form:
   - Skill Name: e.g., "TypeScript"
   - Proficiency: Select level
4. Click "Add Skill"
5. Should show success message
6. Should appear in the list below

---

## Test Admin Features

### Register/Login as Admin First
1. Register new account with role: **Admin** OR
2. Login with: `admin@selftrack.com` / `admin123`

### Access Admin Dashboard
1. From Dashboard, look for **"Admin Dashboard"** in navbar
2. Click it
3. Should see admin-specific features

### Access Denied for Non-Admin
1. Login as regular employee
2. Try to access `/admin` in URL directly
3. Should see "Access Denied" message

---

## Test Multi-Tab Auth Sync

1. Open two browser tabs
2. In Tab 1: Login with `demo@selftrack.com` / `demo123`
3. In Tab 2: Without refreshing, navigate (auth should auto-sync)
4. OR open Tab 3 while logged in Tab 1 → Tab 3 should have auth

---

## Expected Results

| Feature | Expected | Status |
|---------|----------|--------|
| Login | Navigate to dashboard | ✅ Should work |
| Register (Employee) | Create account, login | ✅ Should work |
| Register (Admin) | Create admin account | ✅ Should work |
| Logout | Clear auth, go to login | ✅ Should work |
| Quick Actions | Navigate to pages | ✅ Should work |
| Request Leave | Submit form, appear in list | ✅ Should work |
| Add Skill | Submit form, appear in list | ✅ Should work |
| Admin Access | See admin dashboard | ✅ Should work |
| Non-Admin Access | See denied message | ✅ Should work |

---

## If Anything Fails

1. **Check Console** (F12 → Console tab)
2. **Check Network** (F12 → Network tab)
3. **Check Backend** - http://localhost:5000 should respond
4. **Refresh Page** - Sometimes cache causes issues
5. **Clear Cache** - Ctrl+Shift+Delete

---

## Backend Running?

Check if backend is running:
```
http://localhost:5000/api/health
```

Should return something like:
```json
{
  "status": "ok"
}
```

---

## Test Now!

1. ✅ Backend running on 5000
2. ✅ Start frontend on 3000
3. ✅ Go to http://localhost:3000
4. ✅ Test features above

---

**All fixes are in place and ready to test!** ✅
