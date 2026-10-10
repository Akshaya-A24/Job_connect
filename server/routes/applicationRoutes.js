import express from 'express';
import { 
  applyForJob, 
  getCandidateApplications, 
  getRecruiterApplications, 
  updateApplicationStatus 
} from '../controllers/applicationController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';
import { uploadResume } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', authenticateToken, authorizeRole(['candidate']), uploadResume.single('resume'), applyForJob);
router.get('/candidate', authenticateToken, authorizeRole(['candidate']), getCandidateApplications);
router.get('/recruiter', authenticateToken, authorizeRole(['recruiter', 'admin']), getRecruiterApplications);
router.patch('/:id/status', authenticateToken, authorizeRole(['recruiter', 'admin']), updateApplicationStatus);

export default router;
