import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { readFile, writeFile } from "./file.service.js";
import { generateToken } from "../middleware/verification.middleware.ts";
import { mailVerification } from "../core/communication-hub/email.service.js";
// Loaded once when the module starts
const readData = readFile();
class AuthService { 

}
// Handle user registration
export const signup = async (req: Request, res: Response): Promise<Response> => {
  try { 
  const { name, email, password } = req.body;
  console.log("process.env.MAIL_USER ", process.env.MAIL_USER);
  const data = readFile();
  console.log("Data ", data);
  const user = readData.find((user) => user.email === email);
  // Check if user already exists
  if (user) {
    return res.status(400).send({ message: "User already exists" });
  }
  const verificationUrl = "http://localhost:8000/auth/verify-email";

  const mailObject = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Verify Your Email Address",
    html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  
  <style>
    body{
      margin:0;
      padding:0;
      background:#f4f7fb;
      font-family:Arial, Helvetica, sans-serif;
      color:#333;
    }
  
    .container{
      max-width:600px;
      margin:40px auto;
      background:#ffffff;
      border-radius:12px;
      overflow:hidden;
      box-shadow:0 10px 30px rgba(0,0,0,.08);
    }
  
    .header{
      background:linear-gradient(135deg,#2563eb,#1e40af);
      padding:40px 30px;
      text-align:center;
      color:white;
    }
  
    .logo{
      font-size:32px;
      font-weight:bold;
      letter-spacing:1px;
    }
  
    .content{
      padding:40px 35px;
    }
  
    h1{
      margin-top:0;
      font-size:28px;
      color:#111827;
    }
  
    p{
      font-size:16px;
      line-height:1.7;
      color:#4b5563;
    }
  
    .button{
      display:inline-block;
      margin-top:25px;
      padding:16px 36px;
      background:#2563eb;
      color:#fff !important;
      text-decoration:none;
      border-radius:8px;
      font-weight:bold;
      font-size:16px;
    }
  
    .button:hover{
      background:#1d4ed8;
    }
  
    .note{
      margin-top:35px;
      padding:18px;
      background:#f3f4f6;
      border-radius:8px;
      font-size:14px;
      color:#6b7280;
      word-break:break-all;
    }
  
    .footer{
      padding:25px;
      text-align:center;
      font-size:13px;
      color:#9ca3af;
      border-top:1px solid #eee;
    }
  
  </style>
  </head>
  
  <body>
  
  <div class="container">
  
      <div class="header">
          <div class="logo">
              Your Brand
          </div>
      </div>
  
      <div class="content">
  
          <h1>Verify Your Email</h1>
  
          <p>
              Welcome! We're excited to have you.
              Please verify your email address by clicking the button below.
          </p>
  
          <center>
              <a href="${verificationUrl}" class="button">
                  Verify Email
              </a>
          </center>
  
          <div class="note">
              If the button doesn't work, copy and paste this link into your browser:<br><br>
              ${verificationUrl}
          </div>
  
          <p style="margin-top:30px;">
              If you didn't create an account, you can safely ignore this email.
          </p>
  
      </div>
  
      <div class="footer">
          © ${new Date().getFullYear()} Your Brand. All Rights Reserved.
      </div>
  
  </div>
  
  </body>
  </html>
  `
  };
  console.log("mailObject ", mailObject);
  const sendMail = await mailVerification.sendMail(mailObject);
  console.log("sendMail ", sendMail);

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashedPassword };
  console.log("New user ", newUser);
  // writeFile(newUser);
  // const token = await generateToken(email);
  return res.send({status : 201, message: "please verify your mail to proceed ahead" });
} catch (error) {
  console.log("error ", error);
  return res.status(500).send({ message: "Internal server error" });
}
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