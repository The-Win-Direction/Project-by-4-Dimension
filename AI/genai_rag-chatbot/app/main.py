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

# --- PROMPT TEMPLATE ---
CUSTOM_PROMPT_TEMPLATE = """
You are KrishiGPT, an agricultural assistant helping farmers by answering questions using accurate information from government PDFs, manuals, and policy documents.

Previous Conversation:
{history}

Relevant Documents:
{context}

Question: {question}

Answer in a simple, clear, and helpful manner tailored for farmers. If the answer is unclear from the documents, state that honestly and suggest consulting a local expert.

Avoid chit-chat. Stick to facts based on the documents.
"""

def set_custom_prompt(template):
    return PromptTemplate(template=template, input_variables=["context", "question", "history"])

# --- APP INIT ---
app = FastAPI(title="KrishiGPT - RAG Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load Vectorstore and Embeddings ---
embedding_model = GoogleGenerativeAIEmbeddings(
    model=EMBEDDING_MODEL_NAME,
    google_api_key=API_KEY
)

try:
    db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)
except Exception as e:
    raise RuntimeError(f"Failed to load FAISS vectorstore: {e}")

# --- Load LLM ---
llm = ChatGoogleGenerativeAI(
    model=MODEL_NAME,
    google_api_key=API_KEY
)

# --- Build QA Chain with Custom Prompt ---
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=db.as_retriever(search_kwargs={'k': 3}),
    return_source_documents=True,
    chain_type_kwargs={
        "prompt": set_custom_prompt(CUSTOM_PROMPT_TEMPLATE)
    }
)

# --- Request Schema ---
class QueryRequest(BaseModel):
    query: str
    history: str = ""

# --- Endpoint ---
@app.post("/query")
async def query_qa(request: QueryRequest):
    try:
        response = qa_chain.invoke({
            "question": request.query,
            "history": request.history
        })
        return {
            "response": response["result"],
            "sources": [
                {"source": doc.metadata.get("source", "unknown")} for doc in response["source_documents"]
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query failed: {str(e)}")

# --- Run ---
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
