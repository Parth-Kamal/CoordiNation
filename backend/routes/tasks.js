import { Router } from "express";

import {
   createTask,
   deleteTask,
   getAllTasks,
   getTask,
   updateTask,
} from "../controllers/tasks.js";
import { adminRoute, protectedRoute } from "../middlewares/protectedRoute.js";
import { taskValidation } from "../middlewares/taskValidation.js";

const router = Router();

router.route("/").get(getAllTasks);

router
   .route("/:id")
   .get(getTask)
   .post(adminRoute, taskValidation, createTask)
   .put(adminRoute, taskValidation, updateTask)
   .delete(adminRoute, deleteTask);

export default router;
