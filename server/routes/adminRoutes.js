import express from 'express';
import { getAdminPlacementStats } from '../controllers/adminController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', getAdminPlacementStats);

export default router;
