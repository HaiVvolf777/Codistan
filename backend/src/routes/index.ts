import express from 'express';
import userRoutes from './user.routes';
import jobRoutes from './job.routes';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/jobs', jobRoutes);

export default router;