import { Request, Response } from "express";

export const tasksService = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const task = { id: Date.now(), title, description };
  return res.status(200).send({ status: 200, message: "Task created successfully", task });
}
