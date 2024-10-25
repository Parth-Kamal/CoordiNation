import { Router } from "express";
import { loginValidation, registerValidation } from "../middlewares/authValidation.js";
import { login, register,updateUser  } from "../controllers/auth.js";
import { protect } from "../middlewares/authValidation.js";

const router = Router();

router.route("/register").post(registerValidation, register);

router.route("/login").post(loginValidation, login);
router.route("/update").put(protect, updateUser);

export default router;
