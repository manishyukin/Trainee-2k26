import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
export const verifyRequest = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token ", token);
  if (!token) {
    return res.status(401).send({ message: "Authentication failed" });
  }
  const decoded = jwt.verify(token, "dsfkhsdhfsdkhjfasdf" as string);
  req.body.email = decoded.email;
  next()
}