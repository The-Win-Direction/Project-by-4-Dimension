from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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

# --- CUSTOM PROMPT FOR KRISHIGPT ---
KRISHI_PROMPT = """
You are *KrishiGPT*, an expert AI assistant trained to support farmers, agriculture officers, and students in Nepal.

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

📄 Context:
{context}

❓User Question:
{question}

✅ Answer:
"""

def set_custom_prompt(template):
    return PromptTemplate(template=template, input_variables=["context", "question"])

# --- FASTAPI APP ---
app = FastAPI(title="KrishiGPT Assistant Bot API", version="2.0")

# --- ENABLE CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- LOAD EMBEDDING MODEL + VECTOR DB ---
embedding_model = GoogleGenerativeAIEmbeddings(
    model=EMBEDDING_MODEL_NAME,
    google_api_key=API_KEY
)

try:
    db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)
except Exception as e:
    raise RuntimeError(f"Failed to load FAISS vectorstore: {e}")

# --- LOAD LLM MODEL ---
llm = ChatGoogleGenerativeAI(
    model=MODEL_NAME,
    google_api_key=API_KEY
)

# --- BUILD RETRIEVAL QA CHAIN ---
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="map_reduce",  # Better reasoning than 'stuff'
    retriever=db.as_retriever(search_kwargs={'k': 6}),
    return_source_documents=True,
    chain_type_kwargs={'prompt': set_custom_prompt(KRISHI_PROMPT)}
)

# --- REQUEST MODEL ---
class QueryRequest(BaseModel):
    query: str
    history: list[str] = []

# --- MAIN API ENDPOINT ---
@app.post("/query", summary="Ask KrishiGPT about agriculture in Nepal")
async def query_qa(request: QueryRequest):
    try:
        cleaned_query = request.query.strip().lower()
        greetings = ["hi", "hello", "hey", "namaste", "good morning", "good evening"]

        if cleaned_query in greetings:
            return {
                "response": "🌾 Namaste! I am KrishiGPT, your agricultural assistant. Ask me anything about crops, farming methods, fertilizers, or climate-specific advice for Nepal.",
                "sources": []
            }

        response = qa_chain.invoke({'query': request.query})

        return {
            "response": response["result"],
            "sources": [
                {"source": doc.metadata.get("source", "unknown")} for doc in response["source_documents"]
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query failed: {str(e)}")

# --- MAIN ENTRY ---
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
