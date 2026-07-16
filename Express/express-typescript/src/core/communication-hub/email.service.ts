// env, try catch, template
import nodemailer from "nodemailer";

console.log("process.env.MAIL_USER ", process.env.MAIL_USER);
console.log("process.env.MAIL_PASSWORD ", process.env.MAIL_PASSWORD);
export const mailVerification = await nodemailer.createTransport({
    host : "smtp.gmail.com",
    port : 587, 
    secure : false,
    auth : { 
      user : process.env.MAIL_USER,
      pass : process.env.MAIL_PASSWORD
    }
  })
