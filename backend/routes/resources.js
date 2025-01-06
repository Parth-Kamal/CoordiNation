import { Router } from "express";

import {
   createResource,
   deleteResource,
   getAllResources,
   getResource,
   updateResource,
} from "../controllers/resources";
import { adminRoute } from "../middlewares/protectedRoute";
import { resourceValidation } from "../middlewares/resourceValidation";

const router = Router();

router.route("/").get(getAllResources).post(adminRoute, resourceValidation, createResource);

router
   .route("/:id")
   .get(getResource)
   .put(adminRoute, resourceValidation, updateResource)
   .delete(adminRoute, deleteResource);
