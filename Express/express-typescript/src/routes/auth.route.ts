import express from "express";
import { signup, signin } from "../service/auth.service.js";

export const authRouter = express.Router();

// Auth endpoints
console.log("authRouter is running");
authRouter.post("/signup", signup);
authRouter.post('/signin', signin);


// mail + password  + mailverification 