from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain.chains import RetrievalQA
from langchain_core.prompts import PromptTemplate
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
import uvicorn

# --- CONFIG ---
API_KEY = "YOUR_API_KEY_HERE"
DB_FAISS_PATH = "vectorstore/db_faiss"
MODEL_NAME = "gemini-1.5-flash"
EMBEDDING_MODEL_NAME = "models/embedding-001"

# --- CUSTOM PROMPT ---
CUSTOM_PROMPT_TEMPLATE = """
You are KrishiGPT, a friendly and knowledgeable agricultural assistant for farmers and officials in Nepal.

Respond in a warm, conversational, and helpful tone.

Use only the provided context to answer specific agricultural or policy-related questions. If the answer is not found in the context, reply gently like:
"The information isn't available in the documents I have, but I'm here to help in any other way!"

Use *paragraph format* for general explanations and *bullet points* when listing steps or features.

If user says things like “hi”, “hello”, “namaste”, or asks about you — give a friendly assistant-style reply.

If the user asks for Nepali:
- Translate the answer to Nepali if context is in English.
- Respond in Nepali directly if context already is.

Context:
{context}

User Question:
{question}

Answer:
"""

def set_custom_prompt(template):
    return PromptTemplate(template=template, input_variables=["context", "question"])

# --- INIT ---
app = FastAPI(title="KrishiGPT: Conversational RAG Assistant")

embedding_model = GoogleGenerativeAIEmbeddings(
    model=EMBEDDING_MODEL_NAME,
    google_api_key=API_KEY
)

try:
    db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)
except Exception as e:
    raise RuntimeError(f"Failed to load FAISS vectorstore: {e}")

llm = ChatGoogleGenerativeAI(
    model=MODEL_NAME,
    google_api_key=API_KEY
)

qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=db.as_retriever(search_kwargs={'k': 7}),
    return_source_documents=True,
    chain_type_kwargs={'prompt': set_custom_prompt(CUSTOM_PROMPT_TEMPLATE)}
)

# --- MODELS ---

class QueryRequest(BaseModel):
    query: str

# --- CHAT HISTORY SUPPORT (In-memory for now) ---
chat_history = []

# --- ROUTES ---

@app.post("/query")
async def query_qa(request: QueryRequest):
    user_query = request.query.strip()

    greetings = ["hi", "hello", "hey", "namaste", "good morning", "good evening", "what’s up", "who are you"]
    if user_query.lower() in greetings or "your name" in user_query.lower():
        return {
            "response": "Namaste! 👋 I'm KrishiGPT – your helpful assistant for all things agriculture in Nepal. How can I support you today?",
            "sources": []
        }

    try:
        response = qa_chain.invoke({"query": user_query})
        answer = response.get("result", "").strip()

        if "not available" in answer.lower():
            fallback = llm.invoke(user_query)
            answer += "\n\n🌱 Additional help: " + fallback

        # Append to simple history
        chat_history.append({"user": user_query, "bot": answer})

        return {
            "response": answer,
            "history": chat_history[-10:],  # limit last 10 exchanges
            "sources": [
                {"source": doc.metadata.get("source", "unknown")} for doc in response["source_documents"]
            ]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query failed: {str(e)}")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
