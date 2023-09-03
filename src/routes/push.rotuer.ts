import express from 'express';
import { pushController } from '../controllers/push.controller';
export const pushRouter =  express.Router();

pushRouter.post('/send',pushController.send)