import express from 'express';
import { getAllCompanies, getCompanyById, createCompany } from '../controllers/companyController.js';
import { authenticateToken, authorizeRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllCompanies);
router.get('/:id', getCompanyById);
router.post('/', authenticateToken, authorizeRole(['recruiter', 'admin']), createCompany);

export default router;
