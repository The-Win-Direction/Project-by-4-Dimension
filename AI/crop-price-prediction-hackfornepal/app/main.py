from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.model import load_model_and_encoders, predict_top_months

model, le_crop, le_province = load_model_and_encoders()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictionRequest(BaseModel):
    crop: str
    province: str

@app.post("/predict-top-months")
def predict_post(request: PredictionRequest):
    try:
        results = predict_top_months(model, le_crop, le_province, request.crop, request.province)
        return {
            "crop": request.crop,
            "province": request.province,
            "top_months": results
        }
    except Exception as e:
        return {"error": str(e)}
