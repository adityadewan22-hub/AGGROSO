# CSV Insights Dashboard

---

## 🧱 Tech Stack

### Backend

- FastAPI
- SQLite
- SQLAlchemy
- Gemini API (LLM)

### Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Hosting

- Backend: Render
- Frontend: Vercel

---

## 🚀 How To Run Locally

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv
```

Backend runs at: `http://127.0.0.1:8000`

Create a `.env` file inside the backend folder:

```env
GEMINI_KEY=your_gemini_api_key
DATABASE_URL=sqlite:///./app.db
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
# Install dependencies
npm install
# Run development server
npm run dev
```

Frontend runs at: `http://localhost:3000`

Create a `.env` file inside the frontend folder:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

---

## 📌 Application Features

### Core Features

- CSV file upload
- Automatic dataset profiling
  - Numeric column detection
  - Categorical column detection
  - Missing value analysis
- AI-generated dataset insights (Gemini)
- Save reports to database
- View last 5 reports
- View full report details
- Export report as Markdown

### System & Monitoring

- Backend health endpoint: `/api/health`
- Status endpoint: `/api/status`
- Frontend status page
- Cold-start detection (Render free tier)->using status page

- Basic error handling
- Environment variable configuration

---

## 🏗 Architecture Overview

```
Frontend (Next.js on Vercel)
         ⬇
REST API (FastAPI on Render)
         ⬇
SQLite Database
         ⬇
Gemini LLM API
```

## ⚙️ Deployment Notes

- Backend deployed on Render (Free Tier)
- Frontend deployed on Vercel
- Environment variables configured separately on both platforms
- Backend may experience cold starts (~20–30 seconds after inactivity)
- CORS configured to allow Vercel frontend domain
