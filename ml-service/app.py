from fastapi import FastAPI
from model import predict_productivity, predict_burnout, detect_anomaly, generate_insights

app = FastAPI()

@app.post("/predict/productivity")
def productivity(data: dict):
    return {
        "productivity_score": predict_productivity(data)
    }

@app.post("/predict/burnout")
def burnout(data: dict):
    return predict_burnout(data)

@app.post("/predict/anomaly")
def anomaly(data: dict):
    return detect_anomaly(data)

@app.post("/predict/insights")
def insights(data: dict):
    return generate_insights(data)
