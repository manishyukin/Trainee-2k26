import express from "express";
import { tasksService } from "../service/tasks.service.js";
import { verifyRequest } from "../middleware/verify.request.js";

export const tasksRouter = express.Router();

// Auth endpoints

tasksRouter.post("/create-task", verifyRequest, tasksService);

// http://localhost:8008/task/create-task