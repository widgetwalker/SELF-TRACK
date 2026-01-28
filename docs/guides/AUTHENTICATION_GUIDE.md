# SelfTrack Authentication & Role-Based Access

## Overview
This project now includes full MongoDB Atlas integration with proper authentication and role-based access control. Users can register as either **Employee** or **Admin** with a secure signup/login system.

## Features

### ✅ User Registration
- New users can sign up with name, email, password, and role selection
- Two role options: **Employee** or **Admin**
- Passwords are hashed using bcrypt (minimum 6 characters)
- Duplicate email prevention

### ✅ User Login
- Existing users can log in with email and password
- JWT token generation for session management
- Token-based authentication for all API endpoints
- 7-day token expiration

### ✅ Role-Based Access
- **Employee Role**: Access employee dashboard with personal tasks, leaves, and performance insights
- **Admin Role**: Access admin dashboard for organization-wide analytics and employee management

### ✅ Demo Accounts
The following demo accounts are pre-seeded in the database:

```
Employee:
  Email: demo@selftrack.com
  Password: demo123
  
Admin:
  Email: admin@selftrack.com
  Password: admin123
```

## Tech Stack

- **Database**: MongoDB Atlas (Cloud)
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Backend**: Node.js + Express
- **Frontend**: Vanilla JavaScript

## Setup Instructions

### 1. Environment Variables
Ensure your `.env` file has:
```
PORT=3000
MONGO_URI=mongodb+srv://[username]:[password]@[cluster]/[database]
JWT_SECRET=replace_with_your_secure_jwt_secret
ML_BASE_URL=http://localhost:8000
```

### 2. Start Backend
```bash
cd backend
npm install
npm start
```

Backend will start on port 3000 and connect to MongoDB Atlas.

### 3. Access Frontend
Open: `http://localhost:3000/2-login/login.html`

## Authentication Flow

### Signup Process
1. Click "Sign Up" tab
2. Enter full name, email, password, and select role
3. Click "Create Account"
4. Auto-redirect to respective dashboard

### Login Process
1. Enter email and password
2. Click "Login"
3. Auto-redirect based on role:
   - Admin → Admin Dashboard
   - Employee → Employee Dashboard

## API Endpoints

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "employee"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "employee"
  }
}
```

### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "employee"
  }
}
```

### Get Current User
```bash
GET /api/auth/me
Authorization: Bearer [token]

Response:
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "fullName": "John Doe",
    "email": "john@example.com",
    "role": "employee",
    "skills": []
  }
}
```

## Dashboard Access

### Employee Dashboard
- **URL**: `/3-dashboard/dashboard.html`
- **Access**: Employees logged in with employee role
- **Features**:
  - Personal task management
  - Leave requests
  - Performance insights
  - Skill tracking
  - Burnout risk assessment

### Admin Dashboard
- **URL**: `/admin%20dashboard/admin.html`
- **Access**: Users logged in with admin role
- **Features**:
  - Organization-wide analytics
  - Employee performance overview
  - Team productivity insights
  - ML-based burnout detection
  - Anomaly detection across team

## Data Persistence

All user data is stored in MongoDB Atlas:
- User profiles
- Tasks
- Leave requests
- Skills
- Notifications
- ML analysis results

**No local data or demo mode** - everything is saved to the cloud database.

## Security

- Passwords are hashed with bcrypt (10-salt rounds)
- JWT tokens expire after 7 days
- Protected routes require valid token
- Role-based middleware for admin-only endpoints
- Environment variables for sensitive data

## Troubleshooting

### "Backend unavailable" Error
- Check if backend is running: `npm start` in `/backend` folder
- Verify MongoDB Atlas connection string in `.env`
- Ensure `MONGO_URI` is correct and network is accessible

### Login Not Working
- Clear browser localStorage: Open DevTools → Application → Clear storage
- Verify user email exists in MongoDB Atlas
- Check backend logs for authentication errors

### Can't Access Dashboard After Login
- Ensure token is stored in localStorage
- Check if role is correctly set (admin vs employee)
- Verify API client is configured correctly

## What's Been Changed

1. **Backend Authentication**
   - Enhanced `/api/auth/register` to return full user object
   - Enhanced `/api/auth/login` to return user data with token
   - Added proper validation for all inputs

2. **Frontend Login/Signup**
   - Removed demo mode fallback entirely
   - Added signup form with role selection
   - Proper error handling without local data
   - Role-based automatic redirects

3. **API Client**
   - Added `register()` method
   - Added `getMe()` method
   - All endpoints return real data from MongoDB

## Demo Workflow

1. **First Time Setup**:
   - Go to login page
   - Click "Sign Up"
   - Create account as Employee or Admin
   - Auto-redirect to appropriate dashboard
   - Start using the application with empty data

2. **Try Demo Accounts**:
   - Click "Login" tab
   - Use demo@selftrack.com / demo123 (Employee)
   - Or admin@selftrack.com / admin123 (Admin)
   - See pre-seeded data in database

## Next Steps

- Customize dashboards for your needs
- Add more employee management features
- Implement team collaboration tools
- Add advanced ML analytics
