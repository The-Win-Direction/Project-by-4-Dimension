import os
import tempfile
import shutil
from typing import List
from fastapi import UploadFile
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import FAISS

GOOGLE_API_KEY = "AIzaSyBK5gc2fbQAOBP218EAplCHdssNf7C3hm8"

def load_and_split_pdfs(files: List[UploadFile]):
    tmp_dir = tempfile.mkdtemp()
    docs = []

    try:
        for file in files:
            temp_path = os.path.join(tmp_dir, file.filename)
            with open(temp_path, "wb") as f:
                shutil.copyfileobj(file.file, f)

            loader = PyPDFLoader(temp_path)
            docs.extend(loader.load())

        splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        return splitter.split_documents(docs)
    finally:
        shutil.rmtree(tmp_dir)  # cleanup temporary files

def save_vectorstore(chunks, db_path: str):
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=GOOGLE_API_KEY
    )
    db = FAISS.from_documents(chunks, embeddings)
    db.save_local(db_path)

def load_vectorstore(db_path: str):
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=GOOGLE_API_KEY
    )
    return FAISS.load_local(db_path, embeddings, allow_dangerous_deserialization=True)
