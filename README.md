 🌿 Self Tracking System

A full-stack employee productivity & well-being platform with role-based dashboards, AI-driven analytics, skill management, and salary tracking.

Built with MERN Stack + ML microservices, designed to simulate a real corporate HR & productivity system.

🚀 Features Overview
👤 Employee Features

📊 Personal Dashboard (Productivity, Burnout Risk)

📋 Task Management

🧠 Skill Management (Add / Remove skills)

💰 Salary History (Monthly breakdown)

📝 Leave Requests

🔔 Notifications & Alerts

🛠 Admin Features

👥 Employee Management

📋 Task Assignment & Tracking

🧠 Skill Analytics (Team skill overview)

💰 Salary Management (Assign salaries to employees)

📝 Leave Approval System

📊 AI Analytics Dashboard

🚨 Burnout & Productivity Alerts

🤖 AI / ML Features

Productivity Scoring

Burnout Risk Detection

Anomaly Detection

Auto-run ML on task completion

ML result storage & visualization

🏗 Tech Stack
Frontend

React.js

Tailwind CSS

Axios

Recharts

React Router

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Role-based Access Control

ML Service

Python

FastAPI

Scikit-Learn

Pandas / NumPy

📂 Project Structure
self_tracking_system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── server.js
│   └── .env
│
├── ml-service/
│   ├── app.py
│   ├── models/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   ├── auth/
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md

🔐 Authentication & Roles
Role	Access
Employee	Dashboard, Tasks, Skills, Salary, Leaves
Admin	Employees, Tasks, Skills, Salary, Analytics

JWT tokens are used for secure authentication.

🧠 Skill Module
Employee

Add skills

Remove unwanted skills

Skills persist in database

Clean chip-based UI

Admin

View all employee skills

Skill distribution analytics (future scope)

💰 Salary Module
Admin

Assign salary to employees

Monthly salary entry

Auto calculation of net pay

Salary history table

Employee

View salary history

Month-wise breakdown

📊 AI Analytics
Productivity

Task completion based scoring

Latest score per employee

Historical trends

Burnout Detection

Leave patterns

Workload analysis

Admin alerts for high-risk employees

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/your-username/self-tracking-system.git
cd self-tracking-system

2️⃣ Backend Setup
cd backend
npm install


Create .env:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret


Run backend:

npm run dev

3️⃣ ML Service Setup
cd ml-service
pip install -r requirements.txt
python app.py


Runs on:

http://localhost:8000

4️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Runs on:

http://localhost:5173

📌 API Overview
Skills

GET /api/skills/me

POST /api/skills

GET /api/skills/admin

Salary

POST /api/salaries

GET /api/salaries/me

GET /api/salaries/admin

ML

POST /api/ml/productivity

POST /api/ml/burnout

GET /api/ml/admin/productivity

🧪 Sample Credentials
Admin:
email: admin@test.com
password: admin123

Employee:
email: employee@test.com
password: employee123

🎯 Future Enhancements

Skill levels (Beginner / Intermediate / Expert)

Salary prediction using ML

Team productivity heatmaps

Skill-based task assignment

Performance-based incentives

Charts for skill growth & salary trends