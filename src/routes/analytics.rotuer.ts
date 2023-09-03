import express from 'express';
import { analyticsController } from '../controllers/analytics.controller';
import { analyticsAuth } from '../middleware/auth.middleware';


export const analyticsRouter =  express.Router();

analyticsRouter.get('/token',analyticsController.token)
analyticsRouter.post('/report/:viewId',analyticsAuth,analyticsController.getAnalyticsData)
