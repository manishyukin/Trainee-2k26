import {Request, Response, NextFunction} from 'express'
import jwt from "jsonwebtoken";

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  } 
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  req.body.email = decoded.email;
  next();   
};
export const generateToken =  (email: string) => {
   return jwt.sign({ email }, "dsfkhsdhfsdkhjfasdf" as string, { expiresIn: "1h" });
};

