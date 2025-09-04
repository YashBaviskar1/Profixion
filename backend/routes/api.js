import { Router } from 'express';
import auditRoutes from './audit.js';

const router = Router();

// Mount audit routes under /api/audit
router.use('/audit', auditRoutes);

export default router;
