from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# --- CONFIG ---
API_KEY = "AIzaSyBK5gc2fbQAOBP218EAplCHdssNf7C3hm8"
DB_FAISS_PATH = "vectorstore/db_faiss"
MODEL_NAME = "gemini-1.5-flash"
EMBEDDING_MODEL_NAME = "models/embedding-001"

# --- CUSTOM PROMPT TEMPLATE ---
CUSTOM_PROMPT_TEMPLATE = """
You are KrishiGPT, an expert agricultural assistant. You answer farmers' questions using verified government resources, schemes, and manuals.

{history}

Use the following context to answer the user's latest question:

Context:
{context}

Question:
{question}

Answer with only relevant factual information. If not sure, say you don’t know. Do not guess.
"""

# ✅ FIXED: Removed 'context' from input_variables
def set_custom_prompt(template):
    return PromptTemplate(template=template, input_variables=["question", "history"])

# --- FASTAPI INITIALIZATION ---
app = FastAPI(title="KrishiGPT: RAG-powered Agriculture QA")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- LOAD EMBEDDINGS AND VECTORSTORE ---
embedding_model = GoogleGenerativeAIEmbeddings(
    model=EMBEDDING_MODEL_NAME,
    google_api_key=API_KEY
)

try:
    db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)
except Exception as e:
    raise RuntimeError(f"Failed to load FAISS vectorstore: {e}")

# --- LOAD LLM ---
llm = ChatGoogleGenerativeAI(
    model=MODEL_NAME,
    google_api_key=API_KEY
)

# --- BUILD QA CHAIN ---
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=db.as_retriever(search_kwargs={'k': 3}),
    return_source_documents=True,
    chain_type_kwargs={'prompt': set_custom_prompt(CUSTOM_PROMPT_TEMPLATE)}
)

# --- REQUEST MODEL ---
class QueryRequest(BaseModel):
    query: str
    history: str = ""

# --- ROUTE ---
@app.post("/query")
async def query_qa(request: QueryRequest):
    try:
        # ✅ FIXED: Use 'question' instead of 'query' in chain input
        inputs = {
            "question": request.query,
            "history": request.history
        }
        response = qa_chain.invoke(inputs)
        return {
            "response": response["result"],
            "sources": [
                {"source": doc.metadata.get("source", "unknown")} for doc in response["source_documents"]
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query failed: {str(e)}")

# --- MAIN ---
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
