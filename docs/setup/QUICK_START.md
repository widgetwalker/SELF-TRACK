# 🚀 Quick Start Guide - SelfTrack

## Start the Backend

```bash
cd backend
npm install  # First time only
npm start
```

**Expected Output:**
```
✅ MongoDB connected - Full features enabled
 Self-Track Server running on http://localhost:3000
```

## Access the Application

1. Open: **http://localhost:3000/2-login/login.html**

## Option 1: Login with Demo Account

### Employee Demo
- Email: `demo@selftrack.com`
- Password: `demo123`
- Redirects to: Employee Dashboard

### Admin Demo  
- Email: `admin@selftrack.com`
- Password: `admin123`
- Redirects to: Admin Dashboard

## Option 2: Create New Account

1. Click **"Sign Up"** tab
2. Enter:
   - Full Name
   - Email
   - Password (6+ characters)
   - Select Role: Employee or Admin
3. Click **"Create Account"**
4. Auto-redirect to appropriate dashboard
5. Start using the app with empty data

---

## Features by Role

### 👤 Employee Dashboard
- Manage personal tasks
- Request and track leaves
- View performance insights
- Check burnout risk
- Update skills

### 👨‍💼 Admin Dashboard
- View team analytics
- Monitor all employees
- Check productivity metrics
- Identify at-risk team members
- Manage organization tasks

---

## API Endpoints

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@selftrack.com","password":"demo123"}'
```

### Signup
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName":"John Doe",
    "email":"john@example.com",
    "password":"password123",
    "role":"employee"
  }'
```

---

## Common Tasks

### Clear Saved Data
```javascript
// Open browser DevTools Console and run:
localStorage.removeItem('worktrack_user');
localStorage.removeItem('worktrack_token');
```

### Test API Directly
```bash
# Get current user
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/auth/me
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Port 3000 in use" | Change port in `.env` or kill existing process |
| "Can't connect to MongoDB" | Check `.env` MONGO_URI is valid |
| "Login not working" | Clear localStorage and try again |
| "Can't access admin dashboard" | Login with admin role account |

---

## File Locations

```
/2-login/login.html          ← Login/Signup page
/3-dashboard/dashboard.html  ← Employee dashboard
/admin dashboard/admin.html  ← Admin dashboard
/api-client.js              ← API communication layer
/backend/src/app.js         ← Main backend server
```

---

✅ **Everything is ready!** Start backend and visit the login page.
