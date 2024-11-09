import { Router } from "express";
import { login, register, updateUser } from "../controllers/auth.js";
import { loginValidation, registerValidation } from "../middlewares/authValidation.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = Router();

router.route("/register").post(registerValidation, register);

router.route("/login").post(loginValidation, login);
router.route("/update").put(protectedRoute, updateUser);

export default router;
