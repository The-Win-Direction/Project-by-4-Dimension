from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
import uvicorn

# --- CONFIG ---

API_KEY = "AIzaSyBK5gc2fbQAOBP218EAplCHdssNf7C3hm8"
DB_FAISS_PATH = "vectorstore/db_faiss"
MODEL_NAME = "gemini-1.5-flash"
EMBEDDING_MODEL_NAME = "models/embedding-001"

# --- CUSTOM PROMPT ---

CUSTOM_PROMPT_TEMPLATE = """
You are an agricultural expert assistant for farmers and officials in Nepal.

You must answer based only on the given context and conversation history. If the answer is not in the context, reply: "The information is not available in the provided context."

Use *paragraph format* for definitions and explanations. Use *bullet points* for steps, lists, advantages, etc.

If the user says things like "answer in Nepali", give the answer in Nepali (translate if needed).

---You are *KrishiGPT*, an expert AI assistant trained to support farmers, agriculture officers, and students in Nepal.

🧠 Respond with **accurate, context-based knowledge** ONLY from the documents provided.
🌾 Focus your answers on practical use for Nepal's climate, soil, and seasonal farming needs.

Rules:
- If context doesn't contain the answer, say: **"The answer is not available in the context."**
- Use bullet points only for lists (steps, features, problems).
- Use paragraph format for explanations, definitions, or advice.
- Prefer agricultural terms used in Nepal.

🗣️ If user requests Nepali (e.g., “in Nepali”, “Nepali ma bhan”, etc):
  → If context is in English, translate your answer to Nepali.
  → If context is already in Nepali, reply in Nepali directly.

Otherwise, reply in clear English.

Context:
{context}

History:
{history}

User Question:
{question}

Answer:
"""

def set_custom_prompt(template):
    return PromptTemplate(template=template, input_variables=["context", "history", "question"])

# --- APP INIT ---

app = FastAPI(title="KrishiGPT – Agricultural QA System")

# --- Load Embeddings and Vectorstore ---

embedding_model = GoogleGenerativeAIEmbeddings(
    model=EMBEDDING_MODEL_NAME,
    google_api_key=API_KEY
)

try:
    db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)
except Exception as e:
    raise RuntimeError(f"Failed to load FAISS vectorstore: {e}")

# --- Load Gemini Model ---

llm = ChatGoogleGenerativeAI(
    model=MODEL_NAME,
    google_api_key=API_KEY
)

# --- Build RAG Chain ---

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=db.as_retriever(search_kwargs={"k": 7}),
    return_source_documents=True,
    chain_type_kwargs={"prompt": set_custom_prompt(CUSTOM_PROMPT_TEMPLATE)}
)

# --- Request Model ---

class QueryRequest(BaseModel):
    query: str
    history: list[str] = []

# --- Main Route ---

@app.post("/query")
async def query_krishi_gpt(request: QueryRequest):
    try:
        cleaned_query = request.query.strip().lower()
        greetings = ["hi", "hello", "hey", "namaste", "good morning", "good evening", "नमस्ते"]

        if any(greet in cleaned_query for greet in greetings):
            return {
                "response": "🌾 **Namaste!** I am **KrishiGPT**, your AI assistant for agriculture in Nepal.\n\nAsk me anything about crops, diseases, weather, tools, or farming advice.",
                "sources": []
            }

        history_text = "\n".join(request.history)

        response = qa_chain.invoke({
            "question": request.query,
            "history": history_text
        })

        return {
            "response": response["result"],
            "sources": [
                {"source": doc.metadata.get("source", "unknown")} for doc in response["source_documents"]
            ]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query failed: {str(e)}")

# --- Run (optional if using uvicorn CLI) ---

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
