import express from 'express';
import { pushRouter } from './push.rotuer';
import { analyticsRouter } from './analytics.rotuer';

export const router =  express.Router();

router.use('/push',pushRouter)
router.use('/analytics',analyticsRouter)