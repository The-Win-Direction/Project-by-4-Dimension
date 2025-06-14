from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

# Load model
model = joblib.load("xgb_best_pipeline.pkl")

# Create FastAPI instance
app = FastAPI(title="Pest Prediction API", version="1.0")

# ✅ Allow all CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (POST, GET, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Input schema
class PestInput(BaseModel):
    RF: float
    Temp_Max: float
    Temp_Min: float
    RH_I: float
    RH_II: float
    BSS: float
    Wind_Velocity: float

# Prediction endpoint
@app.post("/predict")
def predict_pest(data: PestInput):
    features = np.array([
        [
            data.RF,
            data.Temp_Max,
            data.Temp_Min,
            data.RH_I,
            data.RH_II,
            data.BSS,
            data.Wind_Velocity
        ]
    ])
    prediction = model.predict(features)[0]
    return {
        "predicted_jassids": round(float(prediction), 3),
        "unit": "count (approx)"
    }
