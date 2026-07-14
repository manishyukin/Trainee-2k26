import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { readFile, writeFile } from "./file.service.js";
import { generateToken } from "../middleware/verification.middleware.ts";
import nodemailer from "nodemailer";
// Loaded once when the module starts
const readData = readFile();

// Handle user registration
export const signup = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password } = req.body;
  const data = readFile();
  console.log("Data ", data);
  const user = readData.find((user) => user.email === email);
  // Check if user already exists
  if (user) {
    return res.status(400).send({ message: "User already exists" });
  }
  
  const mailVerification = await nodemailer.createTransport({
    host : "smtp.gmail.com",
    port : 587, 
    secure : false,
    auth : { 
      user : "manish.yukin@gmail.com",
      pass : "lhxa olqh qoci xvvh"
    }
  })

  const mailData = { 
     from : "manish.yukin@gmail.com",
     to : email,
     subject : "Email Verification",
     text : `Click here to verify your email: http://localhost:8000/auth/verify-email`
  }

  const sendMail = await mailVerification.sendMail(mailData);
  console.log("sendMail ", sendMail);
  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashedPassword };
  console.log("New user ", newUser);
  // writeFile(newUser);
  // const token = await generateToken(email);
  return res.send({status : 201, message: "please verify your mail to proceed ahead" });
};
//  http://localhost:8000/auth/sigin?email=
//Sign-in route 



export const signin = async (req: Request, res: Response): Promise<Response> => {
  const { email,password } = req.body;

  const user = readData.find((user) => user.email === email);

  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  const token = await generateToken(email);
  console.log("isPasswordValid ", isPasswordValid);
  if (!isPasswordValid) {
    return res.status(400).send({ message: "Invalid password" });
  }
  return res.status(200).send({ status : 200, message: "User signed in successfully", token : token });

}