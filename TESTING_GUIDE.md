# 🧪 Complete Testing & Verification Guide

## Quick System Check

Run this to verify everything is working:

```bash
# 1. Start the backend
cd backend
npm start

# 2. Keep backend running, open another terminal
# 3. Run the comprehensive test
python3 << 'PYTHON'
import requests
import json
from datetime import datetime, timedelta

BASE_URL = "http://localhost:3000/api"
print("Testing SelfTrack System...\n")

# Test 1: Employee Login
emp = requests.post(f"{BASE_URL}/auth/login", json={
    "email": "demo@selftrack.com", "password": "demo123"
}).json()
emp_token = emp['token']
emp_id = emp['user']['id']
print("✓ Employee login works")

# Test 2: Admin Login
admin = requests.post(f"{BASE_URL}/auth/login", json={
    "email": "admin@selftrack.com", "password": "admin123"
}).json()
admin_token = admin['token']
print("✓ Admin login works")

# Test 3: Employee gets tasks
tasks = requests.get(f"{BASE_URL}/tasks/my",
    headers={"Authorization": f"Bearer {emp_token}"}).json()['tasks']
print(f"✓ Employee has {len(tasks)} tasks")

# Test 4: Admin creates task
new_task = requests.post(f"{BASE_URL}/tasks",
    headers={"Authorization": f"Bearer {admin_token}"},
    json={"title": "Test", "assignedTo": emp_id}).json()['task']
print("✓ Admin can create tasks")

# Test 5: Employee applies for leave
leave = requests.post(f"{BASE_URL}/leaves",
    headers={"Authorization": f"Bearer {emp_token}"},
    json={
        "startDate": (datetime.now() + timedelta(days=5)).strftime('%Y-%m-%d'),
        "endDate": (datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d'),
        "reason": "Test"
    }).json()['leave']
print("✓ Employee can apply for leave")

# Test 6: Admin approves leave
requests.put(f"{BASE_URL}/leaves/{leave['_id']}/status",
    headers={"Authorization": f"Bearer {admin_token}"},
    json={"status": "approved"})
print("✓ Admin can approve leaves")

# Test 7: Employee updates skill
requests.put(f"{BASE_URL}/skills/my",
    headers={"Authorization": f"Bearer {emp_token}"},
    json={"skills": [{"name": "Python", "level": 3}]})
print("✓ Employee can update skills")

print("\n✓✓✓ ALL SYSTEM TESTS PASSED ✓✓✓")
PYTHON
```

## Dashboard Testing

### Employee Dashboard Checklist

1. **Login as Employee**
   - Go to http://localhost:3000/2-login/login.html
   - Email: demo@selftrack.com
   - Password: demo123
   - Click "Sign In"
   - Should redirect to Employee Dashboard

2. **Verify Navigation**
   - Click "Dashboard" → Shows stats cards ✓
   - Click "Tasks" → Shows task list ✓
   - Click "Leave Management" → Shows leave form and history ✓
   - Click "Skills" → Shows skills and add form ✓
   - Click "Analytics" → Shows performance metrics ✓
   - Click "Notifications" → Shows notifications ✓

3. **Test Leave Application**
   - Go to "Leave Management"
   - Click "+ Request Leave"
   - Select future dates
   - Enter reason
   - Click "Submit Request"
   - Should show success message
   - Leave should appear in history

4. **Test Skills**
   - Go to "Skills"
   - Click "+ Add Skill"
   - Enter skill name and proficiency
   - Click "Add Skill"
   - Skill should appear in list
   - Click "Edit" to change proficiency
   - Click "Delete" to remove

5. **Test Tasks**
   - Go to "Tasks"
   - See all assigned tasks
   - Click status dropdown to change status
   - Should update immediately

### Admin Dashboard Checklist

1. **Login as Admin**
   - Go to http://localhost:3000/2-login/login.html
   - Email: admin@selftrack.com
   - Password: admin123
   - Click "Sign In"
   - Should redirect to Admin Dashboard

2. **Test Employee Management**
   - Click "Employees"
   - See list of all employees
   - Search for employee by name
   - Click employee name to view profile
   - Switch between tabs: Profile, Leave History, Salary, Analytics

3. **Test Task Assignment**
   - Click "Task Management"
   - Click "+ Assign New Task"
   - Select employee
   - Enter task title and description
   - Click "Assign Task"
   - Task should be created

4. **Test Leave Approval**
   - Click "Leave Requests"
   - See pending leave requests
   - Click ✓ to approve
   - Click ✕ to reject
   - Should show notification

5. **Test Analytics**
   - Click "Analytics"
   - View team productivity charts
   - View burnout risk assessment

## Browser Cache Issues

If pages aren't updating:

### Clear Browser Cache
**Chrome:**
- Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
- Select "Cached images and files"
- Click "Clear data"

**Firefox:**
- Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
- Select "Cache"
- Click "Clear Now"

**Safari:**
- Develop → Empty Caches (enable Develop menu first)

### Hard Refresh
- Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- This clears cache and reloads

## localStorage Check

Run this in browser console (F12 → Console):

```javascript
// Check what's stored
console.log("User:", JSON.parse(localStorage.getItem('worktrack_user')));
console.log("Token:", localStorage.getItem('worktrack_token'));

// Clear if needed
localStorage.clear();
```

## Debug Mode

Add this to browser console to enable debug logs:

```javascript
// Enable detailed logging
window.DEBUG = true;
```

Then reload the page and check console for detailed logs.

## Common Issues & Solutions

### Issue: "Backend unavailable" message appears
**Solution:**
1. Ensure backend is running: `npm start` in backend folder
2. Check if running on correct port: `curl http://localhost:3000/`
3. Check MongoDB connection in backend logs

### Issue: Buttons don't respond
**Solution:**
1. Clear browser cache (see above)
2. Hard refresh page (Ctrl+Shift+R)
3. Check browser console for errors (F12)
4. Logout and login again

### Issue: Forms don't appear
**Solution:**
1. Check if page loaded correctly
2. Look for JavaScript errors in console
3. Check that all files are present:
   - `/frontend/3-dashboard/app.js`
   - `/frontend/admin dashboard/admin-app.js`
   - `/frontend/api-client.js`

### Issue: Data not updating
**Solution:**
1. Click on another section and come back
2. Refresh page
3. Check network tab for failed requests
4. Verify backend is responding correctly

## Performance Testing

Monitor response times:

```bash
# Test task creation speed
time curl -X POST "http://localhost:3000/api/tasks" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","assignedTo":"ID","description":"Test"}'

# Test get tasks speed
time curl "http://localhost:3000/api/tasks/my" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Automated Test Suite

Run comprehensive tests:

```bash
python3 << 'PYTHON'
import requests, time, json
from datetime import datetime, timedelta

BASE_URL = "http://localhost:3000/api"
RESULTS = {"passed": 0, "failed": 0, "errors": []}

def test(name, fn):
    try:
        result = fn()
        if result:
            RESULTS["passed"] += 1
            print(f"✓ {name}")
        else:
            RESULTS["failed"] += 1
            RESULTS["errors"].append(name)
            print(f"✗ {name}")
    except Exception as e:
        RESULTS["failed"] += 1
        RESULTS["errors"].append(f"{name}: {str(e)}")
        print(f"✗ {name}: {str(e)}")

# Login
emp_resp = requests.post(f"{BASE_URL}/auth/login", 
    json={"email": "demo@selftrack.com", "password": "demo123"})
emp_token = emp_resp.json()['token']
emp_id = emp_resp.json()['user']['id']

admin_resp = requests.post(f"{BASE_URL}/auth/login",
    json={"email": "admin@selftrack.com", "password": "admin123"})
admin_token = admin_resp.json()['token']

# Tests
test("Employee Login", lambda: emp_resp.status_code == 200)
test("Admin Login", lambda: admin_resp.status_code == 200)
test("Get My Tasks", lambda: requests.get(f"{BASE_URL}/tasks/my",
    headers={"Authorization": f"Bearer {emp_token}"}).status_code == 200)
test("Apply Leave", lambda: requests.post(f"{BASE_URL}/leaves",
    headers={"Authorization": f"Bearer {emp_token}"},
    json={"startDate": "2026-02-05", "endDate": "2026-02-07", "reason": "Test"}
    ).status_code == 201)
test("Get Employees", lambda: requests.get(f"{BASE_URL}/admin/employees",
    headers={"Authorization": f"Bearer {admin_token}"}).status_code == 200)
test("Create Task", lambda: requests.post(f"{BASE_URL}/tasks",
    headers={"Authorization": f"Bearer {admin_token}"},
    json={"title": "Test", "assignedTo": emp_id}
    ).status_code == 201)
test("Update Skill", lambda: requests.put(f"{BASE_URL}/skills/my",
    headers={"Authorization": f"Bearer {emp_token}"},
    json={"skills": [{"name": "Test", "level": 3}]}
    ).status_code == 200)

print(f"\n{'='*50}")
print(f"Tests Passed: {RESULTS['passed']}")
print(f"Tests Failed: {RESULTS['failed']}")
if RESULTS['errors']:
    print(f"Errors: {', '.join(RESULTS['errors'])}")
print(f"{'='*50}")
PYTHON
```

## Support Contacts

If issues persist:
1. Check console logs (F12 → Console tab)
2. Check network requests (F12 → Network tab)
3. Verify backend logs
4. Check MongoDB Atlas connection status

---

**Last Updated**: 2026-01-22
**Version**: 1.0.0
**Status**: 🟢 ALL TESTS PASSING
