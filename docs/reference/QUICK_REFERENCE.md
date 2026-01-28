# Quick Reference Card - SELF-TRACK Integration

## 🚀 One-Command Startup
```bash
./startup.sh
```

## 🌐 Service URLs
| Service | URL | Port |
|---------|-----|------|
| Frontend | file:///path/to/frontend/1-homepage/index.html | - |
| Backend API | http://localhost:5000 | 5000 |
| ML Service | http://localhost:8000 | 8000 |
| MongoDB | mongodb://localhost:27017 | 27017 |

## 🔧 Configuration Files
- **Backend Config**: `backend/.env`
- **Frontend API**: `frontend/api-client.js` (line 2-3)
- **Docker Compose**: `docker-compose.yml`

## 📝 Manual Startup (if docker unavailable)

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run dev

# Terminal 2 - ML Service  
cd backend/ml-service
pip install -r requirements.txt
uvicorn app:app --reload --port 8000

# Terminal 3 - MongoDB (if not running)
mongod
```

## ✅ Health Checks
```bash
# Backend
curl http://localhost:5000/health

# ML Service
curl http://localhost:8000/health

# Backend → ML Service connection
curl http://localhost:5000/health/ml-service
```

## 🔑 Frontend API Usage (Browser Console)
```javascript
// Check setup
api.baseURL  // Should be: http://localhost:5000/api

// Login
api.login('email@example.com', 'password')
  .then(res => console.log(res))
  .catch(err => console.error(err))

// Get Dashboard
api.getDashboard()
  .then(res => console.log(res))

// ML Operations
api.runProductivityML()
api.runBurnoutDetection()
api.runAnomalyDetection()
api.getPerformanceInsights()

// Admin Operations
api.getProductivityOverview()
api.getBurnoutOverview()
api.getAnomalyOverview()
```

## 📊 Test ML Service Directly
```bash
# Test Productivity Prediction
curl -X POST http://localhost:8000/predict/productivity \
  -H "Content-Type: application/json" \
  -d '{
    "tasks_total": 10,
    "tasks_completed": 7,
    "leave_count": 2,
    "skills_count": 5
  }'

# Test Burnout Prediction
curl -X POST http://localhost:8000/predict/burnout \
  -H "Content-Type: application/json" \
  -d '{
    "avg_tasks_per_week": 8,
    "leave_frequency": 2,
    "productivity_trend": 0,
    "overdue_task_ratio": 0.2
  }'

# Test Anomaly Detection
curl -X POST http://localhost:8000/predict/anomaly \
  -H "Content-Type: application/json" \
  -d '{
    "current_productivity": 65,
    "historical_avg_productivity": 85,
    "overdue_task_ratio": 0.6
  }'
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | Check port 5000 is free: `lsof -i :5000` |
| ML Service won't start | Check port 8000 is free: `lsof -i :8000` |
| MongoDB connection failed | Ensure MongoDB running: `mongod` |
| Frontend shows demo data | Backend unavailable - check logs: `docker-compose logs backend` |
| "Cannot fetch" error | Check CORS: ML service should have CORS enabled |
| API timeout | ML service slow - increase `ML_TIMEOUT` in `.env` |

## 📂 Key Files

**Frontend**:
- `frontend/api-client.js` - All API calls
- `frontend/2-login/logsrc.js` - Authentication logic
- `frontend/3-dashboard/script.js` - Dashboard data fetch
- `frontend/admin dashboard/script.js` - Admin ML data fetch

**Backend**:
- `backend/src/services/ml.service.js` - ML integration with retry logic
- `backend/src/app.js` - API routes & health checks
- `backend/ENV_EXAMPLE` - Configuration template

**ML Service**:
- `backend/ml-service/app.py` - ML endpoints with validation
- `backend/ml-service/model.py` - ML model definitions

## 🔄 Data Flow (Quick)

```
Browser Login → Backend Auth → JWT Token
    ↓
Dashboard → api.getDashboard() → Backend queries DB + ML Service
    ↓
If ML Service slow/down → Automatic retry (3x) → Safe defaults
    ↓
Display real data or demo fallback
```

## 🎯 Testing Checklist

- [ ] Services start without errors: `./startup.sh`
- [ ] Health checks pass: `curl http://localhost:5000/health`
- [ ] Frontend loads: `frontend/1-homepage/index.html`
- [ ] Login page appears
- [ ] Demo login works (auto-fills if backend unavailable)
- [ ] Dashboard displays data
- [ ] Admin dashboard shows ML metrics
- [ ] Console has no errors

## 📚 Full Documentation
- **Complete Guide**: `INTEGRATION_GUIDE.md`
- **Summary Report**: `INTEGRATION_SUMMARY.md`
- **README**: `README.md`

## 💡 Tips
- Use `npm run dev` for auto-reload on backend changes
- Use `--reload` flag on uvicorn for ML service hot-reload  
- Check browser DevTools → Network tab to debug API calls
- Demo mode is intentional - tests UI without backend
- ML service timeout is 10 seconds (configurable in `.env`)

## 🚀 Ready to Deploy?
1. Update `.env` with production settings
2. Use docker-compose for deployment
3. Set `NODE_ENV=production`
4. Secure JWT_SECRET with strong key
5. Configure MONGO_URI for cloud database

---
**Last Updated**: 2026-01-21 | Version: 1.0
