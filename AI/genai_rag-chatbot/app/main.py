# File: main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain.chains import ConversationalRetrievalChain
from langchain_community.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_core.prompts import PromptTemplate
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

API_KEY = "AIzaSyBK5gc2fbQAOBP218EAplCHdssNf7C3hm8"
DB_FAISS_PATH = "vectorstore/db_faiss"
MODEL_NAME = "gemini-1.5-flash"
EMBEDDING_MODEL_NAME = "models/embedding-001"

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Custom Prompt
CUSTOM_PROMPT_TEMPLATE = """
You are KrishiGPT, a friendly, knowledgeable, and respectful AI assistant dedicated to supporting agriculture and farming in Nepal.

Your primary goal is to help users with queries related to:
-Agriculture practices
-Crop cultivation and protection
- Soil, irrigation, pests, fertilizers, and organic methods
- Agri-science and plant-related knowledge
- Nepal-specific farming insights, weather, and region-specific tips

You are provided with a history of past user queries to give context. However, you must only respond to the most recent question, not the previous ones.

If the question is:
- Outside your agricultural domain but still positive or related to general science → reply briefly, gently redirecting to your main purpose.
- Off-topic, inappropriate, violent, or sexually explicit → politely decline, explain your role, and steer the conversation back to agriculture.

For general greetings or casual conversation openers (e.g., “Hi”, “How are you?”), respond warmly and make it clear you're here to help with anything farming-related.

Stay supportive, respectful, and helpful in tone throughout.
Context:
{context}

Conversation History:
{chat_history}

User Question:
{question}

Answer:
"""

def set_custom_prompt():
    return PromptTemplate(
        template=CUSTOM_PROMPT_TEMPLATE,
        input_variables=["context", "chat_history", "question"]
    )

# Embedding & DB
embedding = GoogleGenerativeAIEmbeddings(model=EMBEDDING_MODEL_NAME, google_api_key=API_KEY)
db = FAISS.load_local(DB_FAISS_PATH, embedding, allow_dangerous_deserialization=True)
retriever = db.as_retriever(search_kwargs={"k": 7})
llm = ChatGoogleGenerativeAI(model=MODEL_NAME, google_api_key=API_KEY)

# QA Chain with custom prompt
qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=retriever,
    return_source_documents=True,
    combine_docs_chain_kwargs={"prompt": set_custom_prompt()}
)

# Request model
class QueryRequest(BaseModel):
    question: str
    history: list[str] = []

@app.post("/query")
async def query_handler(request: QueryRequest):
    try:
        chat_history = [(msg, "") for msg in request.history]
        response = qa_chain.invoke({
            "question": request.question,
            "chat_history": chat_history,
        })

        return {
            "response": response["answer"],
            "sources": [
                {"source": doc.metadata.get("source", "unknown")}
                for doc in response.get("source_documents", [])
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
