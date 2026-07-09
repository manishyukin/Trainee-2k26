import type { Request, Response } from "express";

// Simple profile handler — reads query params from the request
export const profileService = (req: Request, res: Response): void => {
  console.log("request body ", req.query.page);
  res.send("Got a POST request");
};
