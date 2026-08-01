# AlignCV

AlignCV is an AI-powered ATS Resume Analyzer built using the MERN stack and Google Gemini AI.
It compares a user's resume with a job description and generates an ATS compatibility report including an overall match score, missing skills, strengths, weaknesses, and personalized suggestions to improve the resume.

---

## Live Demo

Frontend: [https://aligncv-kappa.vercel.app/](https://aligncv-kappa.vercel.app/)

Backend: [https://aligncv-backend.onrender.com/](https://aligncv-backend.onrender.com/)

---

## Features

- Secure User Authentication (JWT)
- Forgot Password via Email
- Password Reset using Secure Token
- Resume Upload (PDF)
- ATS Compatibility Score
- Missing Skills Detection
- Resume Strengths & Weaknesses
- AI-powered Suggestions
- Resume Analysis History
- Delete Previous Analyses
- Responsive UI

---

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

### AI
- Google Gemini API

### Libraries Used
- pdf-parse
- multer
- mongoose
- bcryptjs
- jsonwebtoken
- nodemailer

---

## Project Workflow

```
Upload Resume (PDF)
        │
        ▼
Extract Resume Text
        │
        ▼
Paste Job Description
        │
        ▼
Google Gemini Analysis
        │
        ▼
ATS Score + Skill Analysis + Suggestions
        │
        ▼
Save Analysis to MongoDB
        │
        ▼
Display Results & History
```

---

## Project Architecture

```
React (Vite)
      │
      ▼
Express.js API
      │
 ┌────┴─────┐
 ▼          ▼
Gemini AI  MongoDB Atlas
```

---

## Installation

### Clone Repository
```bash
git clone https://github.com/palaksss/fsdg-project.git
cd fsdg-project
```

---

### Backend
```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.
```
PORT=5000
MONGODB_URI=
JWT_SECRET=
GEMINI_API_KEY=
FRONTEND_URL=http://localhost:5173
```

Start backend
```bash
npm start
```

---

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend will start on Vite's default development server, while the backend runs on port 5000.

---

## API Endpoints

```
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/forgot-password
POST   /api/auth/reset-password/:token
POST   /api/upload
POST   /api/analyze
GET    /api/analyses
GET    /api/analyses/:id
DELETE /api/analyses/:id
```

---

## Security

- Passwords encrypted using bcrypt
- JWT Authentication
- Secure password reset via hashed tokens
- Password reset links expire after 15 minutes
- Sensitive credentials stored in environment variables

---

## Notes

- Password reset emails are powered by Resend.
- On the free Resend plan using the default testing domain (`onboarding@resend.dev`), reset emails can only be delivered to the Resend account email.
- To enable password reset for all users, configure a verified custom domain in Resend.

---

## Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

---

## Folder Structure

```
fsdg-project/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── email.js
│   ├── controllers/
│   ├── models/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── data/
│   │   ├── pages/
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
│
└── README.md
```

---

## Screenshots

- Home Page
- Login Page
- Register Page
- Dashboard
- Resume Upload
- Resume Analysis
- Analysis History
- Forgot Password
- Password Reset

---

## Future Improvements

- DOCX Resume Support
- AI Cover Letter Generator
- Resume Builder
- Export Analysis as PDF
- Resume Version Comparison

---

## Acknowledgements

The frontend of this project was initially based on the **SaaSly React Template** by **PrebuiltUI**.

Template: [https://prebuiltui.com/](https://prebuiltui.com/)

The original template served as the starting point for the user interface and was extensively customised for this project. Custom pages, backend integration, AI-powered ATS analysis using Google Gemini, MongoDB integration, resume parsing, and other application-specific functionality were developed as part of AlignCV.

---

## Contributors

- [Shreyashi](https://github.com/Shreyashi-Shreyashi)
- [Palak](https://github.com/palaksss)

---

## License

This project was developed for educational purposes as part of a Full Stack + Generative AI Internship.

The frontend is based on the SaaSly React Template by PrebuiltUI. The original template remains subject to its own licence terms; see `LICENSE.txt` for details. The application-specific code (backend, AI integration, database integration, resume analysis logic, and other custom features) was developed by the project contributors.
