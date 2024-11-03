import { Router } from "express";
import { loginValidation, registerValidation } from "../middlewares/authValidation.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { login, register,uploadProfilePic,updateUserWithProfilePic } from "../controllers/auth.js";


const router = Router();

router.route("/register").post(registerValidation, register);

router.route("/login").post(loginValidation, login);
router.route("/update").put(protectedRoute, uploadProfilePic, updateUserWithProfilePic);

export default router;
