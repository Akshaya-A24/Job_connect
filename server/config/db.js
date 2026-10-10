import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../database.sqlite');
const db = new sqlite3.Database(dbPath);

export function initDatabase() {
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      // 1. Users Table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          role TEXT NOT NULL CHECK(role IN ('candidate', 'recruiter', 'admin')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // 2. Candidate Profiles Table
      db.run(`
        CREATE TABLE IF NOT EXISTS candidate_profiles (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER UNIQUE NOT NULL,
          headline TEXT,
          phone TEXT,
          location TEXT,
          skills TEXT,
          experience_years INTEGER DEFAULT 0,
          education TEXT,
          resume_path TEXT,
          cover_letter TEXT,
          FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);

      // 3. Companies Table
      db.run(`
        CREATE TABLE IF NOT EXISTS companies (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          recruiter_id INTEGER NOT NULL,
          name TEXT NOT NULL,
          logo TEXT,
          banner TEXT,
          industry TEXT,
          location TEXT,
          size TEXT,
          website TEXT,
          description TEXT,
          culture_perks TEXT,
          rating REAL DEFAULT 4.8,
          FOREIGN KEY(recruiter_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);

      // 4. Jobs Table
      db.run(`
        CREATE TABLE IF NOT EXISTS jobs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          company_id INTEGER NOT NULL,
          recruiter_id INTEGER NOT NULL,
          title TEXT NOT NULL,
          category TEXT NOT NULL,
          location TEXT NOT NULL,
          work_mode TEXT NOT NULL CHECK(work_mode IN ('Remote', 'Hybrid', 'On-site')),
          type TEXT NOT NULL CHECK(type IN ('Full-time', 'Part-time', 'Internship', 'Contract')),
          experience_level TEXT NOT NULL,
          salary_min INTEGER NOT NULL,
          salary_max INTEGER NOT NULL,
          description TEXT NOT NULL,
          responsibilities TEXT,
          requirements TEXT,
          benefits TEXT,
          skills TEXT,
          status TEXT DEFAULT 'active' CHECK(status IN ('active', 'closed')),
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(company_id) REFERENCES companies(id) ON DELETE CASCADE,
          FOREIGN KEY(recruiter_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);

      // 5. Job Applications Table
      db.run(`
        CREATE TABLE IF NOT EXISTS job_applications (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          app_ref TEXT UNIQUE NOT NULL,
          job_id INTEGER NOT NULL,
          candidate_id INTEGER NOT NULL,
          candidate_name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          skills TEXT,
          experience_years INTEGER DEFAULT 0,
          education TEXT,
          cover_letter TEXT,
          resume_path TEXT,
          status TEXT DEFAULT 'Applied' CHECK(status IN ('Applied', 'Under Review', 'Shortlisted', 'Interview Scheduled', 'Selected', 'Rejected')),
          applied_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY(job_id) REFERENCES jobs(id) ON DELETE CASCADE,
          FOREIGN KEY(candidate_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);

      // 6. Saved Jobs Table
      db.run(`
        CREATE TABLE IF NOT EXISTS saved_jobs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          candidate_id INTEGER NOT NULL,
          job_id INTEGER NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(candidate_id, job_id),
          FOREIGN KEY(candidate_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY(job_id) REFERENCES jobs(id) ON DELETE CASCADE
        )
      `);

      // Seed Initial Users & Demo Data if empty
      db.get('SELECT COUNT(*) as count FROM users', async (err, row) => {
        if (err) return reject(err);
        if (row.count === 0) {
          console.log('Seeding initial SQLite database...');

          const hashedPass = await bcrypt.hash('password123', 10);

          // Seed Admin
          db.run(
            `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`,
            ['Admin User', 'admin@jobconnect.com', hashedPass, 'admin']
          );

          // Seed Recruiter 1
          db.run(
            `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`,
            ['Sarah Connor (Stripe Recruiter)', 'recruiter@stripe.com', hashedPass, 'recruiter'],
            function (err) {
              if (err) return;
              const recruiter1Id = this.lastID;

              // Seed Stripe Company
              db.run(
                `INSERT INTO companies (recruiter_id, name, logo, banner, industry, location, size, website, description, culture_perks, rating) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  recruiter1Id,
                  'Stripe',
                  '⚡',
                  'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
                  'Financial Infrastructure / Fintech',
                  'San Francisco, CA (Hybrid)',
                  '7,000+ employees',
                  'https://stripe.com',
                  'Stripe is a financial infrastructure platform for businesses.',
                  'Unlimited PTO, $2,000 WFH Stipend, 401(k) Matching',
                  4.8
                ],
                function (err) {
                  if (err) return;
                  const company1Id = this.lastID;

                  // Seed Job 1
                  db.run(`
                    INSERT INTO jobs (company_id, recruiter_id, title, category, location, work_mode, type, experience_level, salary_min, salary_max, description, responsibilities, requirements, benefits, skills)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                  `, [
                    company1Id, recruiter1Id,
                    'Senior Frontend Architect (React / TypeScript)',
                    'Software Development',
                    'San Francisco, CA',
                    'Hybrid',
                    'Full-time',
                    'Senior (5+ yrs)',
                    185000, 235000,
                    'Lead the UI design system and core payment components at Stripe dashboard micro-frontends.',
                    'Design accessible React components, optimize performance, collaborate with designers.',
                    '5+ years React/TypeScript experience, deep CSS knowledge, accessibility mastery.',
                    'Equity grant ($120k value), $2,500 Home Office budget, Full Healthcare',
                    'React, TypeScript, Tailwind CSS, Next.js, System Design'
                  ]);
                }
              );
            }
          );

          // Seed Candidate 1
          db.run(
            `INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)`,
            ['Alex Morgan', 'alex@example.com', hashedPass, 'candidate'],
            function (err) {
              if (err) return;
              const candidateId = this.lastID;
              db.run(
                `INSERT INTO candidate_profiles (user_id, headline, phone, location, skills, experience_years, education)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                  candidateId,
                  'Senior Frontend Engineer',
                  '+1 (555) 234-5678',
                  'San Francisco, CA',
                  'React, TypeScript, Tailwind CSS, Node.js, Next.js',
                  5,
                  'B.S. Computer Science'
                ]
              );
            }
          );
        }
        resolve();
      });
    });
  });
}

export default db;
