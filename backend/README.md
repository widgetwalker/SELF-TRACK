 Project Overview

The Self Tracking & Workforce Management System is a backend platform designed to manage employees, tasks, leaves, skills, salaries, notifications, and analytics in a secure and scalable way.

It supports role-based access control (Admin / Employee), provides real-time notifications, and generates analytics & productivity insights.

This backend is designed to integrate with:

React (Web)

React Native (Mobile)

Future ML microservices (Python)

 System Architecture
Client (Web / Mobile)
        |
        v
Node.js Backend (Express)
        |
        |-- Authentication & RBAC (JWT)
        |-- Business APIs
        |-- Analytics & Notifications
        |
        v
MongoDB Atlas

Planned ML Architecture (Next Phase)
Node.js Backend
        |
        v
Python ML Service (FastAPI)
        |
        v
Predictions stored in MongoDB

 Backend Tech Stack

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT Authentication

Role-Based Access Control (RBAC)

 User Roles
 Employee

View & update own tasks

Apply for leave

View leave history

Update skill profile

View own salary

View notifications

View analytics dashboard

 Admin

Create & assign tasks

Approve / reject leaves

Upload salaries

View all employees & skills

View system-wide analytics

 Project Folder Structure
src/
├── controllers/
│   ├── auth.controller.js
│   ├── task.controller.js
│   ├── leave.controller.js
│   ├── skill.controller.js
│   ├── salary.controller.js
│   ├── dashboard.controller.js
│   ├── analytics.controller.js
│   └── notification.controller.js
│
├── models/
│   ├── user.model.js
│   ├── task.model.js
│   ├── leave.model.js
│   ├── salary.model.js
│   └── notification.model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── task.routes.js
│   ├── leave.routes.js
│   ├── skill.routes.js
│   ├── salary.routes.js
│   ├── dashboard.routes.js
│   ├── analytics.routes.js
│   └── notification.routes.js
│
├── middleware/
│   ├── auth.middleware.js
│   └── role.middleware.js
│
├── config/
│   ├── db.js
│   └── env.js
│
├── app.js
└── server.js

 Authentication & Authorization

JWT-based authentication

Password hashing with bcrypt

Protected routes using middleware

Role-based access (admin, employee)

 API Endpoints

 Authentication
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

 Tasks
POST   /api/tasks              (Admin)
GET    /api/tasks/my           (Employee)
PUT    /api/tasks/:id/status   (Employee)

 Leave Management
POST   /api/leaves             (Employee)
GET    /api/leaves/my          (Employee)
GET    /api/leaves             (Admin)
PUT    /api/leaves/:id/status  (Admin)

 Skills
GET    /api/skills/my          (Employee)
PUT    /api/skills/my          (Employee)
GET    /api/skills/all         (Admin)

 Salary / Payslip
POST   /api/salary             (Admin)
GET    /api/salary/my          (Employee)

 Notifications
GET    /api/notifications/my
PUT    /api/notifications/:id/read


Triggered on:

Task assignment

Leave approval/rejection

Salary upload

 Dashboard
GET    /api/dashboard


Returns role-based summary data.

 Analytics
GET    /api/analytics


Provides:

Productivity score

Task completion stats

Leave usage

System-wide insights (admin)

 Environment Variables

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key

 Run the Project Locally
npm install
npm run dev


Server runs on:

http://localhost:5000

 Future Enhancements

ML-based productivity scoring

Burnout risk detection

Anomaly detection

Email & push notifications

Advanced analytics dashboards