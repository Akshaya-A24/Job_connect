import express from 'express';
import { getAllJobs, getJobById, createJob, deleteJob } from '../controllers/jobController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJobById);
router.post('/', authenticateToken, authorizeRole(['recruiter', 'admin']), createJob);
router.delete('/:id', authenticateToken, authorizeRole(['recruiter', 'admin']), deleteJob);

export default router;
