# Self-Track API Documentation

**Base URL**: `http://localhost:5000/api`

---

## Table of Contents

1. [Authentication](#authentication)
2. [Tasks](#tasks)
3. [Leaves](#leaves)
4. [Skills](#skills)
5. [Salary](#salary)
6. [ML Service](#ml-service)
7. [Admin](#admin)
8. [Notifications](#notifications)
9. [Analytics](#analytics)
10. [Error Codes](#error-codes)

---

## Authentication

All API endpoints (except `/auth/register` and `/auth/login`) require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### Register User
- **Endpoint**: `POST /auth/register`
- **Body**:
  ```json
  {
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123",
    "role": "employee"  // "admin" or "employee"
  }
  ```
- **Response** (201):
  ```json
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
- **Endpoint**: `POST /auth/login`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "SecurePassword123"
  }
  ```
- **Response** (200): Same as register response

### Get Current User
- **Endpoint**: `GET /auth/me`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "success": true,
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "fullName": "John Doe",
      "email": "john@example.com",
      "role": "employee",
      "skills": [
        { "name": "JavaScript", "level": 4 },
        { "name": "Node.js", "level": 3 }
      ]
    }
  }
  ```

---

## Tasks

### Create Task (Admin Only)
- **Endpoint**: `POST /tasks`
- **Headers**: Authorization required, Role: Admin
- **Body**:
  ```json
  {
    "title": "Complete Project Report",
    "description": "Finish Q1 project report",
    "assignedTo": "507f1f77bcf86cd799439012",
    "priority": "high",  // "low", "medium", "high"
    "dueDate": "2026-02-28T00:00:00Z"
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "task": {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Complete Project Report",
      "description": "Finish Q1 project report",
      "status": "pending",
      "assignedTo": "507f1f77bcf86cd799439012",
      "createdBy": "507f1f77bcf86cd799439010",
      "priority": "high",
      "dueDate": "2026-02-28T00:00:00Z",
      "createdAt": "2026-01-23T14:00:00Z",
      "updatedAt": "2026-01-23T14:00:00Z"
    }
  }
  ```

### Get My Tasks
- **Endpoint**: `GET /tasks/my`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "success": true,
    "count": 5,
    "tasks": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "title": "Complete Project Report",
        "description": "Finish Q1 project report",
        "status": "pending",
        "priority": "high",
        "dueDate": "2026-02-28T00:00:00Z",
        "createdBy": {
          "_id": "507f1f77bcf86cd799439010",
          "fullName": "Admin User",
          "email": "admin@example.com"
        },
        "createdAt": "2026-01-23T14:00:00Z"
      }
    ]
  }
  ```

### Update Task Status
- **Endpoint**: `PUT /tasks/:id/status`
- **Headers**: Authorization required
- **Body**:
  ```json
  {
    "status": "completed"  // "pending", "in_progress", "completed"
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Task status updated successfully",
    "task": { ... }
  }
  ```

---

## Leaves

### Apply for Leave
- **Endpoint**: `POST /leaves`
- **Headers**: Authorization required
- **Body**:
  ```json
  {
    "startDate": "2026-02-01T00:00:00Z",
    "endDate": "2026-02-05T00:00:00Z",
    "reason": "Family vacation"
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "Leave request submitted successfully",
    "leave": {
      "_id": "507f1f77bcf86cd799439014",
      "employee": "507f1f77bcf86cd799439012",
      "startDate": "2026-02-01T00:00:00Z",
      "endDate": "2026-02-05T00:00:00Z",
      "reason": "Family vacation",
      "status": "pending",
      "createdAt": "2026-01-23T14:00:00Z"
    }
  }
  ```

### Get My Leaves
- **Endpoint**: `GET /leaves/my`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "success": true,
    "count": 3,
    "leaves": [ ... ]
  }
  ```

### Get All Leaves (Admin Only)
- **Endpoint**: `GET /leaves`
- **Headers**: Authorization required, Role: Admin
- **Response** (200):
  ```json
  {
    "success": true,
    "count": 10,
    "leaves": [ ... ]
  }
  ```

### Approve/Reject Leave (Admin Only)
- **Endpoint**: `PUT /leaves/:id/status`
- **Headers**: Authorization required, Role: Admin
- **Body**:
  ```json
  {
    "status": "approved",  // "approved" or "rejected"
    "reviewNotes": "Approved for vacation"
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Leave status updated successfully",
    "leave": { ... }
  }
  ```

---

## Skills

### Get My Skills
- **Endpoint**: `GET /skills/my`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "success": true,
    "skills": [
      { "name": "JavaScript", "level": 4 },
      { "name": "Node.js", "level": 3 }
    ]
  }
  ```

### Update My Skills
- **Endpoint**: `PUT /skills/my`
- **Headers**: Authorization required
- **Body**:
  ```json
  {
    "skills": [
      { "name": "JavaScript", "level": 5 },
      { "name": "TypeScript", "level": 4 },
      { "name": "React", "level": 3 }
    ]
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Skills updated successfully",
    "user": { ... }
  }
  ```

### Get All Skills (Admin Only)
- **Endpoint**: `GET /skills/all`
- **Headers**: Authorization required, Role: Admin
- **Response** (200):
  ```json
  {
    "success": true,
    "employees": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "fullName": "John Doe",
        "email": "john@example.com",
        "skills": [
          { "name": "JavaScript", "level": 4 }
        ]
      }
    ]
  }
  ```

---

## Salary

### Create Salary Record (Admin Only)
- **Endpoint**: `POST /salary`
- **Headers**: Authorization required, Role: Admin
- **Body**:
  ```json
  {
    "employee": "507f1f77bcf86cd799439012",
    "month": "2026-01",
    "basic": 50000,
    "allowances": 10000,
    "deductions": 5000
  }
  ```
- **Response** (201):
  ```json
  {
    "success": true,
    "message": "Salary created successfully",
    "salary": {
      "_id": "507f1f77bcf86cd799439015",
      "employee": "507f1f77bcf86cd799439012",
      "month": "2026-01",
      "basic": 50000,
      "allowances": 10000,
      "deductions": 5000,
      "netPay": 55000,
      "createdAt": "2026-01-23T14:00:00Z"
    }
  }
  ```

### Get My Salary History
- **Endpoint**: `GET /salary/my`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "success": true,
    "count": 12,
    "salaries": [ ... ]
  }
  ```

---

## ML Service

### Predict Productivity
- **Endpoint**: `POST /ml/productivity`
- **Headers**: Authorization required
- **Body**:
  ```json
  {
    "tasks_total": 15,
    "tasks_completed": 12,
    "leave_count": 2,
    "skills_count": 5
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "productivity_score": 78.5,
    "message": "Productivity prediction completed"
  }
  ```

### Detect Burnout Risk
- **Endpoint**: `POST /ml/burnout`
- **Headers**: Authorization required
- **Body**:
  ```json
  {
    "avg_tasks_per_week": 12,
    "leave_frequency": 0.3,
    "productivity_trend": -5,
    "overdue_task_ratio": 0.2
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "burnout_risk": "medium",
    "risk_score": 0.65,
    "message": "Medium risk detected - consider workload management"
  }
  ```

### Detect Anomaly
- **Endpoint**: `POST /ml/anomaly`
- **Headers**: Authorization required
- **Body**:
  ```json
  {
    "current_productivity": 45,
    "historical_avg_productivity": 75,
    "overdue_task_ratio": 0.4
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "anomaly_detected": true,
    "severity": "high",
    "message": "Significant drop in productivity detected"
  }
  ```

### Generate Insights
- **Endpoint**: `POST /ml/insights`
- **Headers**: Authorization required
- **Body**:
  ```json
  {
    "productivity_score": 78,
    "burnout_risk": "low",
    "leave_frequency": 0.2
  }
  ```
- **Response** (200):
  ```json
  {
    "success": true,
    "insights": {
      "strengths": ["High productivity", "Good work-life balance"],
      "weaknesses": ["Could improve task completion rate"],
      "recommendations": ["Continue current pace", "Consider mentoring others"]
    }
  }
  ```

---

## Admin

### Get Admin Dashboard
- **Endpoint**: `GET /admin/dashboard`
- **Headers**: Authorization required, Role: Admin
- **Response** (200):
  ```json
  {
    "success": true,
    "stats": {
      "totalEmployees": 25,
      "totalTasks": 150,
      "completedTasks": 120,
      "pendingLeaves": 5,
      "avgProductivity": 75.3
    }
  }
  ```

### Get All Employees
- **Endpoint**: `GET /admin/employees`
- **Headers**: Authorization required, Role: Admin
- **Response** (200):
  ```json
  {
    "success": true,
    "count": 25,
    "employees": [ ... ]
  }
  ```

### Get Employee Details
- **Endpoint**: `GET /admin/employees/:id`
- **Headers**: Authorization required, Role: Admin
- **Response** (200):
  ```json
  {
    "success": true,
    "employee": { ... }
  }
  ```

### Get Employee Leaves
- **Endpoint**: `GET /admin/employees/:id/leaves`
- **Headers**: Authorization required, Role: Admin
- **Response** (200):
  ```json
  {
    "success": true,
    "count": 5,
    "leaves": [ ... ]
  }
  ```

---

## Notifications

### Get My Notifications
- **Endpoint**: `GET /notifications/my`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "success": true,
    "count": 10,
    "notifications": [
      {
        "_id": "507f1f77bcf86cd799439016",
        "title": "New Task Assigned",
        "message": "You have been assigned a new task: Complete Project Report",
        "isRead": false,
        "createdAt": "2026-01-23T14:00:00Z"
      }
    ]
  }
  ```

### Mark Notification as Read
- **Endpoint**: `PUT /notifications/:id/read`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Notification marked as read"
  }
  ```

---

## Analytics

### Get Analytics
- **Endpoint**: `GET /analytics`
- **Headers**: Authorization required
- **Response** (200):
  ```json
  {
    "success": true,
    "analytics": {
      "taskCompletion": 80,
      "avgProductivity": 75,
      "burnoutRisk": "low",
      "trends": [ ... ]
    }
  }
  ```

---

## Health Check

### Backend Health
- **Endpoint**: `GET /health` or `GET /api/health`
- **Response** (200):
  ```json
  {
    "success": true,
    "message": "Backend is healthy",
    "timestamp": "2026-01-23T14:00:00Z",
    "uptime": 3600,
    "environment": "development"
  }
  ```

### ML Service Health
- **Endpoint**: `GET /health/ml-service` or `GET /api/health/ml-service`
- **Response** (200):
  ```json
  {
    "success": true,
    "healthy": true,
    "mlService": {
      "status": "operational",
      "version": "1.0.0"
    }
  }
  ```

---

## Error Codes

### Common Error Responses

#### 400 - Validation Error
```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "message": "Request validation failed",
  "errors": [
    {
      "field": "email",
      "message": "\"email\" must be a valid email"
    }
  ]
}
```

#### 401 - Unauthorized
```json
{
  "success": false,
  "code": "UNAUTHORIZED",
  "message": "Authentication required"
}
```

#### 403 - Forbidden
```json
{
  "success": false,
  "code": "FORBIDDEN",
  "message": "Access denied - admin role required"
}
```

#### 404 - Not Found
```json
{
  "success": false,
  "code": "NOT_FOUND",
  "message": "Resource not found"
}
```

#### 409 - Conflict
```json
{
  "success": false,
  "code": "DUPLICATE_ENTRY",
  "message": "email already exists"
}
```

#### 500 - Server Error
```json
{
  "success": false,
  "code": "INTERNAL_SERVER_ERROR",
  "message": "An unexpected error occurred"
}
```

---

## Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Resource already exists |
| 500 | Server Error - Internal error |
| 503 | Service Unavailable - ML service down |

---

## Example cURL Requests

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "SecurePassword123",
    "role": "employee"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePassword123"
  }'
```

### Get My Tasks (with token)
```bash
curl -X GET http://localhost:5000/api/tasks/my \
  -H "Authorization: Bearer <your_token_here>"
```

