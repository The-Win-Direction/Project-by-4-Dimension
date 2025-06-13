from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib
import numpy as np

# Load the model and scaler at startup
model = joblib.load("xgb_crop_model.joblib")
scaler = joblib.load("minmax_scaler.joblib")

# Crop label map
crop_dict = {
    0: 'rice', 1: 'maize', 2: 'jute', 3: 'cotton', 4: 'coconut', 5: 'papaya',
    6: 'orange', 7: 'apple', 8: 'muskmelon', 9: 'watermelon', 10: 'grapes',
    11: 'mango', 12: 'banana', 13: 'pomegranate', 14: 'lentil', 15: 'blackgram',
    16: 'mungbean', 17: 'mothbeans', 18: 'pigeonpeas', 19: 'kidneybeans',
    20: 'chickpea', 21: 'coffee'
}

# FastAPI app
app = FastAPI(title="Crop Prediction API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Input model with validation
class CropInput(BaseModel):
    N: int = Field(..., ge=0, le=140, description="Nitrogen (0-140)")
    P: int = Field(..., ge=5, le=145, description="Phosphorus (5-145)")
    K: int = Field(..., ge=5, le=205, description="Potassium (5-205)")
    temperature: float = Field(..., ge=5.0, le=50.0, description="Temperature in °C (5-50)")
    humidity: float = Field(..., ge=0.0, le=100.0, description="Humidity % (0-100)")
    ph: float = Field(..., ge=3.0, le=10.0, description="pH level (3-10)")
    rainfall: float = Field(..., ge=0.0, le=300.0, description="Rainfall mm (0-300)")

# Prediction route
@app.post("/predict", summary="Predict the best crop to grow")
def predict_crop(data: CropInput):
    try:
        # Prepare and scale input
        input_array = np.array([[data.N, data.P, data.K, data.temperature, data.humidity, data.ph, data.rainfall]])
        scaled_input = scaler.transform(input_array)

        # Model prediction
        predicted_index = model.predict(scaled_input)[0]
        crop_name = crop_dict.get(predicted_index, "Unknown crop")

        return {
            "input": data.dict(),
            "predicted_crop": crop_name
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
