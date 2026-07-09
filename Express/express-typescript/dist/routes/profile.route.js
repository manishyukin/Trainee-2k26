import express from "express";
import { profileService } from "../service/profile.service.js";
export const profileRouter = express.Router();
profileRouter.get("/get-profile", profileService);
