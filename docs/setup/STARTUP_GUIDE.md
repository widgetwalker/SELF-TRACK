# 🚀 Self-Track Startup Guide

## Quick Start (Recommended)

### Option 1: Using Batch File (Windows) - SIMPLEST
```bash
Double-click: RUN.bat
```
- ✅ Backend starts in background (minimized window)
- ✅ Frontend opens in current window
- ✅ Both running and ready to use

### Option 2: Using START.bat
```bash
Double-click: START.bat
```
- Simple, clean startup
- Backend runs minimized
- Frontend visible in main window

### Option 3: Using npm (from root directory)
```bash
npm install    # First time only - installs concurrently
npm start      # Starts both backend and frontend
```
- Requires concurrently package
- Shows both outputs in one terminal
- Press Ctrl+C to stop both

### Option 4: Manual Startup (if scripts fail)
```bash
# Terminal 1 - Backend (run in background)
cd backend
npm start

# Terminal 2 - Frontend (visible)
cd frontend
npm start
```

---

## 📊 What Gets Started

| Service | Port | Status | Window |
|---------|------|--------|--------|
| Backend API | 5000 | Background | Minimized |
| Frontend | 3000 | Visible | Main Window |
| MongoDB | 27017 | Connected | N/A |

---

## 🔐 Login & Test

**Frontend:** http://localhost:3000

**Test Credentials:**
```
Employee: demo@selftrack.com / demo123
Admin:    admin@selftrack.com / admin123
```

---

## 🛑 How to Stop Services

### Method 1: Close Frontend Window
- Click X on the frontend terminal
- Backend will keep running in background

### Method 2: Stop All Services
- Close the frontend window
- Close the backend minimized window
- Or use Task Manager to stop `node.exe`

### Method 3: Using Terminal
Press `Ctrl+C` in the respective windows

---

## ✨ Features

| Feature | Status |
|---------|--------|
| Auto-start backend | ✅ Yes |
| Auto-start frontend | ✅ Yes |
| Backend in background | ✅ Yes (minimized) |
| Frontend visible | ✅ Yes |
| Automatic retry | ✅ Yes |
| Dependency check | ✅ Yes (in RUN.bat) |

---

## 🐛 Troubleshooting

### Issue: "Node.js not found"
**Solution:** Install Node.js from https://nodejs.org/

### Issue: Backend not starting
**Solution:** 
1. Open backend folder manually
2. Run: `npm install` then `npm start`
3. Check if MongoDB is running

### Issue: Frontend won't start
**Solution:**
1. Open frontend folder manually
2. Run: `npm install` then `npm start`
3. Check http://localhost:3000

### Issue: "npm: command not found"
**Solution:** Add Node.js to PATH or restart your terminal

### Issue: Port already in use
**Solution:** Stop other applications using ports 3000 or 5000

---

## 📁 Files Included

- **RUN.bat** - Full-featured startup (RECOMMENDED)
  - Checks Node.js installation
  - Better error handling
  - Clear output messages

- **START.bat** - Simple startup
  - Quick and minimal
  - Starts both services

- **start-all.bat** - Alternative startup
  - Similar to START.bat
  - Different approach

- **package.json** - Root level npm scripts
  - Allows `npm start` from root
  - Allows `npm run start:backend-only`
  - Allows `npm run start:frontend-only`

---

## 🎯 Recommended Usage

**For Development:**
```bash
# Double-click RUN.bat
# Then test at http://localhost:3000
```

**For Testing:**
```bash
npm start    # From root directory
# Then test at http://localhost:3000
```

**For Production Prep:**
```bash
npm run install:all     # Install all dependencies
npm start               # Start all services
```

---

## 📋 Verification Checklist

After startup, verify:

- [ ] Backend window minimized/in background
- [ ] Frontend window visible and responsive
- [ ] Can access http://localhost:3000
- [ ] Can login with demo@selftrack.com
- [ ] Backend API responding on 5000
- [ ] Dashboard loads successfully

---

## 💡 Pro Tips

1. **Keep Backend Window Open** - Even if minimized, it's running
2. **Frontend is Main Window** - Close this to stop frontend
3. **Use Task Manager** - To see running Node processes
4. **Check Logs** - Open backend window to see API logs
5. **Refresh Frontend** - If page doesn't load, try F5

---

## 🔄 Common Workflows

### Daily Development
```bash
# Morning startup
Double-click RUN.bat

# Work on code
# (Frontend auto-reloads on save)

# Stop when done
Close frontend window + backend window
```

### Testing New Features
```bash
Double-click RUN.bat
Login with test credentials
Test feature
Repeat
```

### Debugging API Issues
```bash
Double-click RUN.bat
Open backend minimized window to see logs
Check API responses in Browser DevTools (F12 → Network)
```

---

## ✅ Success Indicators

✅ Backend started (see minimized window in taskbar)
✅ Frontend loaded at http://localhost:3000
✅ Can see login form
✅ Can login with test credentials
✅ Dashboard loads
✅ All buttons work
✅ API calls succeed (check F12 → Network)

---

**All Set! Enjoy Self-Track! 🎉**

For detailed documentation, see:
- COMPLETE_FIX_SUMMARY.md
- QUICK_TEST_GUIDE.md
- README.md
