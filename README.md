# JOBCONNECT – Modern Job Portal Website

**JOBCONNECT** is a full-stack, modern job portal web application that connects job seekers with top companies and recruiters. Candidates can explore verified roles, filter by salary and skills, upload resumes, and track application statuses online.

---

## 🌟 Key Features

1. **Candidate Web Portal**:
   - Multi-field Hero search bar (Keyword, Location, Category).
   - Dedicated 2-Column Job Search page with multi-filters (Category, Work mode, Salary range slider, Employment type).
   - Real-time **AI Skill Compatibility Matcher** displaying match percentage against user's skills.
   - Comprehensive Job Details modal with matched vs recommended skill breakdown.
   - Interactive **Salary Insights & Benchmark Calculator**.

2. **Drag & Drop Resume Upload & Application**:
   - 4-step job application form.
   - Drag & Drop Resume file uploader (supports `.pdf`, `.doc`, `.docx` up to 10MB).
   - Application reference ID generation & duplicate application prevention.

3. **Placement & Admin Analytics Dashboard**:
   - Complete analytics overview matching the design specifications:
     - **TOTAL STUDENTS**: 450 (+20.1%)
     - **STUDENTS PLACED**: 342 (+18.5%)
     - **PLACEMENT RATE**: 76.0% (+15.2%)
     - **ACTIVE JOBS**: 28 (+12.3%)
     - Quick actions: Invite members, export data, add student, add company, schedule report.
     - Upcoming deadlines, top recruiters list, and departments needing attention.

4. **Express REST API & SQLite Database**:
   - Dual candidate & recruiter authentication with JWT and bcrypt password hashing.
   - SQLite persistent storage for users, companies, jobs, applications, and saved jobs.
   - Multer middleware handling secure resume file uploads.

---

## 🛠️ Project Structure

```
job-connect/
├── client/                     # Vite + React Frontend
│   ├── src/
│   │   ├── components/         # Navbar, Hero, JobCard, JobDetailsModal, ApplyModal, AdminDashboard, SalaryInsights...
│   │   ├── data/               # Mock dataset & benchmarks
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                     # Node.js + Express Backend
│   ├── config/                 # db.js (SQLite setup & seed runner)
│   ├── controllers/            # authController, jobController, applicationController, adminController, companyController
│   ├── middleware/             # authMiddleware.js, uploadMiddleware.js
│   ├── routes/                 # authRoutes, jobRoutes, applicationRoutes, companyRoutes, adminRoutes
│   ├── uploads/                # Uploaded resume files (.pdf, .docx)
│   ├── package.json
│   └── server.js               # Express entry point
└── README.md
```

---

## 🚀 How to Run the Project

### 1. Run Backend Server (Express + SQLite)

```bash
cd server
npm install
npm start
```
The REST API server will run at `http://localhost:5000`.

### 2. Run Frontend Web App (Vite + React)

```bash
# In another terminal window:
npm install
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

---

## 🔒 Default Test Accounts

- **Admin Account**: `admin@jobconnect.com` / `password123`
- **Recruiter Account**: `recruiter@stripe.com` / `password123`
- **Candidate Account**: `alex@example.com` / `password123`
