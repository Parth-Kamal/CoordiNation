import compression from "compression";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

import auth from "./routes/auth.js";
import tasks from "./routes/tasks.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";
import { protectedRoute } from "./middlewares/protectedRoute.js";
const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan("dev"));

app.use(cors());
app.use(bodyParser.json());

app.post("/contact", async (req, res) => {
   const { name, email, department, message } = req.body;
 
   if (!name || !email || !department || !message) {
     return res.status(400).json({ success: false, message: "All fields are required." });
   }
 
   try {
     // Nodemailer Transport Configuration
     const transporter = nodemailer.createTransport({
       service: "gmail",
       auth: {
         user: process.env.GMAIL_USER, // Your Gmail address
         pass: process.env.GMAIL_PASS, // App-specific password
       },
     });
 
     // Email Content
     const mailOptions = {
       from: email, // Sender's email
       to: process.env.GMAIL_USER, // Your Gmail (where to send the form details)
       subject: `New Contact Form Submission to ${department}`,
       html: `
         <h3>Contact Form Submission</h3>
         <p><strong>Name:</strong> ${name}</p>
         <p><strong>Email:</strong> ${email}</p>
         <p><strong>Department:</strong> ${department}</p>
         <p><strong>Message:</strong><br>${message}</p>
       `,
     };
 
     // Send Email
     await transporter.sendMail(mailOptions);
 
     res.status(200).json({ success: true, message: "Your message was sent successfully!" });
   } catch (error) {
     console.error("Error sending email:", error);
     res.status(500).json({ success: false, message: "Internal server error. Could not send the email." });
   }
 });

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(compression());

app.use("/auth", auth);

app.use(protectedRoute);

app.use("/api/tasks", tasks);

app.all("*", (req, res) => {
   res.status(404).json({
      message: `Can't find ${req.originalUrl} on this server!`,
   });
});

app.use(globalErrorHandler);

export default app;
