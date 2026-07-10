import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { readFile, writeFile } from "./file.service.js";
import { generateToken } from "../middleware/verification.middleware.ts";
// Loaded once when the module starts
const readData = readFile();

// Handle user registration
export const signup = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body;
  const tok  = req.headers.authorization?.split(" ")[1];
  console.log("Token** ", tok);
  const data = readFile();
  console.log("Data ", data);
  const user = readData.find((user) => user.email === email);
  // Check if user already exists
  if (user) {
    return res.status(400).send({ message: "User already exists" });
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashedPassword };
  console.log("New user ", newUser);
  writeFile(newUser);
  const token = await generateToken(email);
  return res.send({status : 201, message: "please verify your mail to proceed ahead", token : token });
};
//  http://localhost:8000/auth/sigin?email=
//Sign-in route 
export const signin = async (req: Request, res: Response): Promise<Response> => {
  const { email,password } = req.body;
  console.log("email ", email);
  const user = readData.find((user) => user.email === email);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("isPasswordValid ", isPasswordValid);
  if (!isPasswordValid) {
    return res.status(400).send({ message: "Invalid password" });
  }
  return res.status(200).send({ status : 200, message: "User signed in successfully" });

}