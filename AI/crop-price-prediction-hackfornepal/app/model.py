import joblib
import numpy as np
import pandas as pd

def load_model_and_encoders():
    model = joblib.load("crop_price_model.pkl")
    le_crop = joblib.load("le_crop.pkl")
    le_province = joblib.load("le_province.pkl")
    return model, le_crop, le_province

def predict_top_months(model, le_crop, le_province, crop_name, province_name):
    crop_encoded = le_crop.transform([crop_name])[0]
    province_encoded = le_province.transform([province_name])[0]

    test_data = pd.DataFrame({
        'crop_encoded': [crop_encoded] * 12,
        'province_encoded': [province_encoded] * 12,
        'month': list(range(1, 13))
    })

    predicted_prices = model.predict(test_data)
    top_months_idx = np.argsort(predicted_prices)[-2:][::-1]

    top_months = [
        {
            "month": int(test_data.iloc[i]['month']),
            "predicted_price": float(round(predicted_prices[i], 2))  # <- Cast to float
        }
        for i in top_months_idx
    ]

    return top_months

