from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from PIL import Image
import pytesseract
import numpy as np
import io
import cv2

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.output_parsers import StructuredOutputParser, ResponseSchema

# --- CONFIGURATION ---

API_KEY = "YOUR_GOOGLE_API_KEY"  # Replace with your real key
MODEL_NAME = "gemini-1.5-flash"

DEFAULT_VALUES = {
    "N": 50.55,
    "P": 53.36,
    "K": 48.15,
    "temperature": 25.62,
    "humidity": 71.48,
    "pH": 6.47,
    "rainfall": 103.46
}

# LangChain + Gemini setup
llm = ChatGoogleGenerativeAI(
    model=MODEL_NAME,
    google_api_key=API_KEY,
    temperature=0.5
)

response_schemas = [
    ResponseSchema(name="N", description="Nitrogen value"),
    ResponseSchema(name="P", description="Phosphorus value"),
    ResponseSchema(name="K", description="Potassium value"),
    ResponseSchema(name="temperature", description="Temperature in Celsius"),
    ResponseSchema(name="humidity", description="Humidity in percentage"),
    ResponseSchema(name="pH", description="Soil pH level"),
    ResponseSchema(name="rainfall", description="Rainfall in mm")
]

output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
format_instructions = output_parser.get_format_instructions()

# FastAPI app
app = FastAPI(
    title="Soil Report OCR Extractor",
    description="Extracts N, P, K, temperature, humidity, pH, and rainfall from soil report image."
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ROUTE ---
@app.post("/soil-ocr/")
async def analyze_soil_image(file: UploadFile = File(...)):
    try:
        # Step 1: Read and convert image
        image_bytes = await file.read()
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        image_np = np.array(image)
        gray = cv2.cvtColor(image_np, cv2.COLOR_RGB2GRAY)

        # Step 2: OCR extraction using pytesseract
        extracted_text = pytesseract.image_to_string(gray)

        # Step 3: LLM prompt
        prompt = f"""
You are a soil report analyzer.

From the following raw soil report text, extract the following values:
- N (Nitrogen)
- P (Phosphorus)
- K (Potassium)
- temperature (in Celsius)
- humidity (in %)
- pH (soil pH level)
- rainfall (in mm)

If values in the soil report are in Nepali language, translate them into English.

Use this format:
{format_instructions}

Soil Report Text:
{extracted_text}
        """

        # Step 4: Invoke Gemini
        gemini_response = llm.invoke(prompt)
        structured_data = output_parser.parse(gemini_response.content)

        # Step 5: Fill missing values
        complete_data = {}
        for key, default in DEFAULT_VALUES.items():
            value = structured_data.get(key)
            if value is None or value == "":
                complete_data[key] = default
            else:
                try:
                    complete_data[key] = float(value)
                except ValueError:
                    complete_data[key] = default

        return {
            "status": "success",
            "raw_text": extracted_text,
            "parsed_data": complete_data
        }

    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"status": "error", "message": str(e)}
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
