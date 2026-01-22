from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from model import predict_productivity, predict_burnout, detect_anomaly, generate_insights

app = FastAPI(title="Self-Track ML Service", version="1.0.0")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schemas
class ProductivityInput(BaseModel):
    tasks_total: int
    tasks_completed: int
    leave_count: int
    skills_count: int

    @validator('tasks_total', 'tasks_completed', 'leave_count', 'skills_count')
    def validate_non_negative(cls, v):
        if v < 0:
            raise ValueError('Values must be non-negative')
        return v

class BurnoutInput(BaseModel):
    avg_tasks_per_week: int
    leave_frequency: int
    productivity_trend: float
    overdue_task_ratio: float

    @validator('avg_tasks_per_week', 'leave_frequency')
    def validate_non_negative(cls, v):
        if v < 0:
            raise ValueError('Values must be non-negative')
        return v

    @validator('overdue_task_ratio')
    def validate_ratio(cls, v):
        if not (0 <= v <= 1):
            raise ValueError('Ratio must be between 0 and 1')
        return v

class AnomalyInput(BaseModel):
    current_productivity: int
    historical_avg_productivity: int
    overdue_task_ratio: float

    @validator('current_productivity', 'historical_avg_productivity')
    def validate_score(cls, v):
        if not (0 <= v <= 100):
            raise ValueError('Productivity score must be between 0 and 100')
        return v

    @validator('overdue_task_ratio')
    def validate_ratio(cls, v):
        if not (0 <= v <= 1):
            raise ValueError('Ratio must be between 0 and 1')
        return v

class InsightsInput(BaseModel):
    productivity_score: int
    burnout_risk: str
    overdue_task_ratio: float
    leave_frequency: int

    @validator('productivity_score')
    def validate_score(cls, v):
        if not (0 <= v <= 100):
            raise ValueError('Productivity score must be between 0 and 100')
        return v

    @validator('burnout_risk')
    def validate_risk(cls, v):
        if v not in ['low', 'medium', 'high']:
            raise ValueError('Risk must be low, medium, or high')
        return v

@app.get("/")
def root():
    return {
        "message": "Self-Track ML Service is running",
        "version": "1.0.0",
        "endpoints": {
            "productivity": "/predict/productivity",
            "burnout": "/predict/burnout",
            "anomaly": "/predict/anomaly",
            "insights": "/predict/insights",
            "health": "/health"
        }
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ML Service",
        "version": "1.0.0"
    }

@app.post("/predict/productivity")
def productivity(data: ProductivityInput):
    try:
        result = predict_productivity(data.dict())
        return {"productivity_score": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.post("/predict/burnout")
def burnout(data: BurnoutInput):
    try:
        result = predict_burnout(data.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.post("/predict/anomaly")
def anomaly(data: AnomalyInput):
    try:
        result = detect_anomaly(data.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.post("/predict/insights")
def insights(data: InsightsInput):
    try:
        result = generate_insights(data.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Insights generation failed: {str(e)}")
