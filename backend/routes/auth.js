import { Router } from "express";
import { loginValidation, registerValidation } from "../middlewares/authValidation.js";
import { login, register } from "../controllers/auth.js";

const router = Router();

router.route("/register").post(registerValidation, register);

router.route("/login").post(loginValidation, login);

export default router;
