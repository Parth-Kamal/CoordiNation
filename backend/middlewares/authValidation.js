import yup from "yup";
import jwt from "jsonwebtoken";
import Users from "../models/users.js";

const registerSchema = yup.object({
   name: yup.string().min(3).max(100).required("Name is required"),
   email: yup
      .string()
      .email("Invalid email format")
      .max(100)
      .required("Email is required"),
   password: yup.string().min(8).max(20).required("Password is required"),
   department: yup.string().required("Department is required"),
   role: yup.string().oneOf(["admin", "official"]).default("official"),
   profilePic: yup.string().nullable(),
});

const loginSchema = yup.object({
   email: yup
      .string()
      .email("Invalid email format")
      .max(100)
      .required("Email is required"),
   password: yup.string().min(8).max(20).required("Password is required"),
});

export const registerValidation = async (req, res, next) => {
   try {
      await registerSchema.validate(req.body, {strict: true});
      next();
   } catch (error) {
      res.status(400).json({ message: "Bad Request", error });
   }
};

export const loginValidation = async (req, res, next) => {
   try {
      await loginSchema.validate(req.body, {strict: true});
      next();
   } catch (error) {
      res.status(400).json({ message: "Bad Request", error });
   }
};

export const protect = async (req, res, next) => {
   try {
      // Get token from headers (make sure the front-end sends it)
      const token = req.headers.authorization?.split(" ")[1]; // Expecting format: "Bearer token"

      if (!token) {
         return res.status(401).json({ message: "Not authorized, no token", success: false });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultSecret");

      // Find the user associated with the token
      const user = await Users.findById(decoded._id).select("-hashedPassword");

      if (!user) {
         return res.status(404).json({ message: "User not found", success: false });
      }

      // Attach user to request object for further access
      req.user = user;
      next();
   } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed", success: false });
   }
};
