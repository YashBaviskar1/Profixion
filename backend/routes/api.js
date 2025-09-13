import { Router } from 'express';
import auditRoutes from './audit.js';
import paymentRoutes from './payment.js';

const router = Router();

// Mount audit routes under /api/audit
router.use('/audit', auditRoutes);

// Mount payment routes under /api/payment
router.use('/payment', paymentRoutes);

export default router;
