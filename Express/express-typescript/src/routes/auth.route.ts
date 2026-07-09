import express from "express";
import { signup, signin } from "../service/auth.service.js";
import { generateToken } from "../middleware/verification.logic.js";

export const authRouter = express.Router();

// Auth endpoints
authRouter.post("/signup", signup);
authRouter.post('/signin', signin);
