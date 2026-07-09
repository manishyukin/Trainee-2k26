import express from "express";
import { signup, signin } from "../service/auth.service.js";
export const authRouter = express.Router();
// Auth endpoints
authRouter.post("/signup", signup);
authRouter.post('/signin', signin);
