# Self Tracking System

## Introduction
The Self Tracking System is a centralized, transparent, and intelligent workforce management system. It is a full-stack employee productivity and well-being platform featuring role-based dashboards, AI-driven analytics, skill management, and salary tracking. The system simulates a real corporate HR and productivity platform.

## Organization Profile
This project acts as an internal HR and workforce management system for a modern organization. It focuses on transparency between employees and administrators, while providing tools for performance measurement, skill tracking, and employee well-being monitoring.

## Learning Modules
Throughout this project, the following areas were explored and learned:
- Full-stack web development using the MERN stack (MongoDB, Express.js, React.js, Node.js).
- Machine learning integration with microservices via Python and FastAPI.
- Secure role-based access control and JWT authentication.
- RESTful API design and integration.
- Responsive frontend development using Tailwind CSS.
- AI-driven analytics for predicting productivity and burnout risks.

## Projects(s) Implemented
- **Self Tracking System**: The core project encompasses employee features (dashboards, task management, skill management, salary history, leave requests, notifications) and admin features (employee management, task assignment, skill analytics, salary management, leave approvals, AI analytics).

## Problem Statement
Organizations often struggle with disparate systems for tracking employee tasks, skills, salaries, and well-being. Additionally, identifying burnout or declining productivity early is difficult without intelligent analytics, leading to decreased performance and employee dissatisfaction.

## Objective
The primary objective is to create a unified platform that manages all aspects of employee tracking—ranging from task completion and salary history to skill development and leave management—while employing AI to analyze productivity and proactively detect burnout risks.

## Scope of the Project
The scope covers:
- **Employee Portal**: Personal dashboards, task/skill/salary tracking, and leave requests.
- **Admin Portal**: Workforce management, task assignment, salary disbursements, leave approvals, and analytics.
- **AI/ML Integration**: Productivity scoring, burnout risk detection, and anomaly detection based on task completions and leave patterns.

## Technologies Used
- **Frontend**: React.js, Tailwind CSS, Axios, Recharts, React Router
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT Authentication
- **ML Service**: Python, FastAPI, Scikit-Learn, Pandas, NumPy

## System Architecture
The application follows a microservices-inspired architecture:
- A React-based frontend communicates with a Node.js/Express.js backend via REST APIs.
- The backend manages the MongoDB database for user, task, skill, leave, and salary data.
- A separate Python/FastAPI microservice handles machine learning tasks, such as calculating productivity scores and detecting burnout risks, and communicates with the Node.js backend.

## Methodology
The project was developed using an iterative, component-based methodology:
1. **Design**: Wireframing the role-based interfaces and defining the database schemas.
2. **Backend Development**: Establishing the MERN backend, authentication, and core API routes.
3. **Frontend Development**: Building responsive UI components and integrating them with the APIs.
4. **ML Integration**: Developing the Python microservice for analytics and integrating it with the main backend.
5. **Testing & Refinement**: End-to-end testing of role access, data flow, and ML model accuracy.

## Implementation
### Setup Instructions
1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/self-tracking-system.git
   cd self-tracking-system
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file with `PORT=5000`, `MONGO_URI=...`, and `JWT_SECRET=...`. Run `npm run dev`.

3. **ML Service Setup:**
   ```bash
   cd ml-service
   pip install -r requirements.txt
   python app.py
   ```
   Runs on `http://localhost:8000`.

4. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Runs on `http://localhost:5173`.

### Sample Credentials
- Admin: `admin@test.com` / `admin123`
- Employee: `employee@test.com` / `employee123`

## Progress/ Status of the Project
The project successfully implemented core MERN stack features along with the integration of the ML microservice for productivity and burnout analytics. Future enhancements planned include tracking skill levels, salary predictions using ML, team productivity heatmaps, and performance-based incentives.

## Conclusion
The Self Tracking System demonstrates a modern approach to workforce management, blending standard HR operations with intelligent, AI-driven insights to foster a transparent and supportive environment for both employees and administrators.
