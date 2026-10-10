import express from 'express';
import cors from 'cors';
import authRoutes from '../server/routes/authRoutes.js';
import jobRoutes from '../server/routes/jobRoutes.js';
import applicationRoutes from '../server/routes/applicationRoutes.js';
import companyRoutes from '../server/routes/companyRoutes.js';
import adminRoutes from '../server/routes/adminRoutes.js';
import { initDatabase } from '../server/config/db.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database initialization on cold start
initDatabase().catch(console.error);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'JOBCONNECT Serverless API on Vercel', timestamp: new Date() });
});

export default app;
