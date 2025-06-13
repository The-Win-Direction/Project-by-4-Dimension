import requests
import json

API_KEY = "AIzaSyDLv6zgj59ohZlrJdmbE3QjE5PfmyMIOGw"
API_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={API_KEY}"

chat_history = []

DOMAIN_PRIMER = (
    "You are a multilanguage supported AI assistant nick named as  specialized for a platform called FarmFuse. "
    "FarmFuse provides AI-driven agricultural support such as market prediction, province-wise insights, crop profitability guides, "
    "top-selling months for each crop, and smart recommendations for farmers. "
    "Give domain-specific and helpful responses tailored to the needs of farmers and agricultural users."
)

 
chat_history.append({"role": "user", "parts": [{"text": DOMAIN_PRIMER}]})


def get_gemini_response(prompt: str) -> str:
    chat_history.append({"role": "user", "parts": [{"text": prompt}]})

    payload = {
        "contents": chat_history,
    }

    try:
        response = requests.post(API_URL, headers={"Content-Type": "application/json"}, json=payload)
        response.raise_for_status()
        result = response.json()

        if result and result.get("candidates") and result["candidates"][0].get("content") and result["candidates"][0]["content"].get("parts"):
            text_response = result["candidates"][0]["content"]["parts"][0]["text"]
            chat_history.append({"role": "model", "parts": [{"text": text_response}]})
            return text_response
        else:
            return "Error: Could not get a valid response from the Gemini API. " \
                   f"Response structure unexpected: {json.dumps(result, indent=2)}"

    except requests.exceptions.RequestException as e:
        return f"Error connecting to the Gemini API: {e}"
    except json.JSONDecodeError as e:
        return f"Error decoding JSON response from API: {e}"
    except Exception as e:
        return f"An unexpected error occurred: {e}"


def main():
    print("Welcome to FarmFuse Assistant! Type 'exit' to quit.")
    print("--------------------------------------------------")

    while True:
        user_input = input("You: ")
        if user_input.lower() == 'exit':
            print("Chatbot: Goodbye!")
            break

        print("Chatbot: Thinking...", end='\r')
        bot_response = get_gemini_response(user_input)
        print("Chatbot: " + bot_response)
        print("-" * 50)


if __name__ == "__main__":
    main()
