from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
import uvicorn

# --- CONFIG ---
API_KEY = "YOUR_GOOGLE_API_KEY"
DB_FAISS_PATH = "vectorstore/db_faiss"
MODEL_NAME = "gemini-1.5-flash"
EMBEDDING_MODEL_NAME = "models/embedding-001"

# --- PROMPT TEMPLATE ---
KRISHI_PROMPT = """
You are *KrishiGPT*, an expert AI assistant trained to support farmers, agriculture officers, and students in Nepal.

🧠 Respond with **accurate, context-based knowledge** ONLY from the documents provided.
🌾 Focus on practical use for Nepal's climate, soil, and seasonal farming needs.

Rules:
- If context doesn't contain the answer, respond **"❌ The answer is not available in the context."**
- Use bullet points for lists.
- Use paragraphs for explanations.
- Prefer Nepali agricultural terms.

🗣️ If user asks “in Nepali”, translate to Nepali.
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
app = FastAPI(title="KrishiGPT", version="1.0")

# --- CORS Setup ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # lock this down in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load Embeddings + DB + LLM ---
emb = GoogleGenerativeAIEmbeddings(model=EMBEDDING_MODEL_NAME, google_api_key=API_KEY)
db = FAISS.load_local(DB_FAISS_PATH, emb, allow_dangerous_deserialization=True)
llm = ChatGoogleGenerativeAI(model=MODEL_NAME, google_api_key=API_KEY)

# --- Build QA Chain with proper prompt key ---
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    retriever=db.as_retriever(search_kwargs={"k": 6}),
    return_source_documents=True,
    chain_type="map_reduce",
    chain_type_kwargs={"combine_prompt": set_custom_prompt(KRISHI_PROMPT)}
)

# --- Request Model ---
class QueryRequest(BaseModel):
    query: str
    history: List[str] = []

# --- API Endpoint ---
@app.post("/query")
async def query_krishigpt(req: QueryRequest):
    try:
        q = req.query.strip()
        low = q.lower()
        greetings = ["hi", "hello", "hey", "namaste", "good morning", "good evening"]

        # Handle greetings
        if low in greetings:
            return {
                "response": "🌾 Namaste! I am KrishiGPT — your farming AI assistant. How can I help you today?",
                "sources": []
            }

        # Framing history + current query for context retrieval
        combined = "\n".join(req.history + [f"You: {q}"])
        docs = db.similarity_search(combined, k=6)
        if not docs or all(not doc.page_content.strip() for doc in docs):
            return {"response": "❌ The answer is not available in the context.", "sources": []}

        # Invoke QA chain with raw question
        res = qa_chain.invoke({"query": q})

        return {
            "response": res["result"],
            "sources": [{"source": d.metadata.get("source", "unknown")} for d in res["source_documents"]]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query failed: {e}")

# --- Launch App ---
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
