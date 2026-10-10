# Vercel Deployment Guide for JOBCONNECT

This project is pre-configured for seamless 1-click deployment on **Vercel** with support for both the React frontend and the Express Serverless API!

---

## 🛠️ Method 1: Deploy via GitHub (Recommended)

1. **Create a GitHub Repository**:
   - Go to [GitHub.com](https://github.com/new) and create a new repository named `jobconnect`.

2. **Push the Project to GitHub**:
   Run the following commands in PowerShell inside `C:\Users\Asokan\.gemini\antigravity\scratch\job-connect`:

   ```bash
   git init
   git add .
   git commit -m "Initial commit for JOBCONNECT full-stack app"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/jobconnect.git
   git push -u origin main
   ```

3. **Deploy on Vercel Dashboard**:
   - Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **Add New** → **Project**.
   - Import your `jobconnect` repository from GitHub.
   - Framework Preset: **Vite**.
   - Root Directory: `./` (leave default).
   - Click **Deploy**.

---

## ⚡ Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Run Vercel Deploy Command**:
   Open PowerShell in `C:\Users\Asokan\.gemini\antigravity\scratch\job-connect` and execute:
   ```bash
   vercel
   ```
   Follow the prompts in the terminal:
   - Set up and deploy? **`Y`**
   - Which scope? Select your personal account.
   - Link to existing project? **`N`**
   - Project name? **`jobconnect`**
   - In which directory is your code located? **`./`**
   - Auto-detected project settings? **`Y`**

3. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## 📁 Pre-Configured Vercel Files

- **`vercel.json`**: Configures path rewrites mapping `/api/*` to Vercel serverless functions and `/*` to the Vite React single-page frontend.
- **`api/index.js`**: Express REST API serverless entrypoint for Vercel functions.
- **`.gitignore`**: Prevents node_modules and temporary database files from being committed.
