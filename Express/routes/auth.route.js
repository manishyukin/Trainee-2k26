import express from 'express';
import {signup} from '../service/auth.service.js';
export const authRouter = express.Router();

authRouter.post('/signup', signup)
// authRouter.post('/signin', signin);

