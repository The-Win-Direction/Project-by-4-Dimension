# **KhetTracker (KrishiGPT) – AI-Driven Agricultural Advisory System**

KhetTracker (also known as **KrishiGPT**) is an AI-powered agricultural assistant designed to help farmers, agronomists, and researchers make data-driven decisions. The system delivers real-time insights, crop recommendations, pest/disease predictions, and climate-aware suggestions using a blend of **FastAPI**, **RAG**, and transformer-based NLP/ML models.

---

## 🚀 **Key Features**

### 🔍 Agricultural Q&A (AI Chatbot – RAG Powered)

* Intelligent query handling using **LangChain + custom embeddings**
* Answers about crops, soil, pests, fertilizers, diseases, and farming best practices
* Pulls data from curated agriculture knowledge bases

### 🌾 Crop Recommendation Engine

* Suggests suitable crops based on:

  * Soil type
  * Weather & climate
  * Season
  * Region
* Hybrid ML + rule-based pipeline

### 🐛 Pest & Disease Advisory

* AI-generated detection and remedy suggestions
* Includes organic + chemical control options

### 🌤 Weather-Aware Insights

* Integrates weather APIs
* Provides irrigation & risk alerts
* Handles climate-based yield impact analysis

### 📊 Farmer-Friendly Dashboard (Optional Frontend)

* Clean UI for interacting with the model
* Multilingual support
* Mobile responsive

---

## 🧠 **System Architecture**

```
User Query
     ↓
Frontend (React) / CLI / API Client
     ↓
FastAPI Backend
     ↓
RAG Pipeline (LangChain)
     ├── Vector Store (FAISS / ChromaDB)
     ├── Embedding Model (SentenceTransformers)
     └── LLM (OpenAI / Local Model)
     ↓
Response Synthesizer
     ↓
Final AI Answer
```

---

## 🛠 **Tech Stack**

### **Backend**

* FastAPI
* Python
* Uvicorn
* LangChain
* FAISS / ChromaDB
* OpenAI API / Local LLMs

### **AI/ML**

* SentenceTransformers
* DistilBERT
* RAG + prompt engineering
* Optional ML models for crop/pest prediction

### **Frontend (Optional)**

* React.js
* Tailwind CSS
* Axios

---

## 📁 **Project Structure**

```
khettracker/
│── backend/
│   ├── main.py
│   ├── routers/
│   ├── services/
│   ├── rag/
│   │    ├── embeddings.py
│   │    ├── vector_store.py
│   │    └── retriever.py
│   ├── models/
│   ├── dataset/
│   └── utils/
│
│── frontend/  
│   ├── src/
│   └── public/
│
└── README.md
```

---

## ⚙️ **Setup Instructions**

### **1. Clone the repository**

```bash
git clone https://github.com/The-Win-Direction/Project-by-4-Dimension/
cd khettracker/backend
```

### **2. Create virtual environment**

```bash
python3 -m venv venv
source venv/bin/activate
```

### **3. Install dependencies**

```bash
pip install -r requirements.txt
```

### **4. Configure environment variables**

Create a `.env` file:


### **5. Run FastAPI server**

```bash
uvicorn main:app --reload
```

### **6. (Optional) Run frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## 🎥 **Demo Video**

[https://www.youtube.com/watch?v=t6rCWoVzcE0](https://www.youtube.com/watch?v=t6rCWoVzcE0)

---


