import os
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
from tensorflow import keras
from dotenv import load_dotenv
import json

load_dotenv()

app = FastAPI()

# Allow access from any origin
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
model_path = os.getenv("MODEL_PATH", "detection_model_mobilenetv2.h5")
model = keras.models.load_model(model_path)

# Load class indices from JSON file with UTF-8 encoding
class_indices_path = os.getenv("CLASS_INDICES_PATH", "class_indices.json")
with open(class_indices_path, encoding='utf-8') as f:
    class_indices = json.load(f)

# Function to preprocess image
def preprocess_image(image):
    image_rgb = image.convert("RGB")
    resized_image = image_rgb.resize((224, 224))
    normalized_image = np.array(resized_image, dtype=np.float32) / 255.0
    input_image = np.expand_dims(normalized_image, axis=0)
    return input_image


# Function to predict diseases
def predict_diseases(model, image, class_indices):
    preprocessed_img = preprocess_image(image)
    probs = model.predict(preprocessed_img)[0]
    predicted_class_index = np.argmax(probs)
    predicted_class_name = class_indices[str(predicted_class_index)]
    return predicted_class_name, float(probs[predicted_class_index])

@app.get("/hello")
async def say_hello():
    return {"message": "Hello, welcome to the plant disease detection API!"}

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    image = Image.open(file.file)
    predicted_disease, probability = predict_diseases(model, image, class_indices)
    return {"predicted_disease": predicted_disease, "probability": probability}


if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8080))
    uvicorn.run(app, host=host, port=port)


