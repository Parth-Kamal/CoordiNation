import compression from "compression";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import auth from "./routes/auth.js";
import tasks from "./routes/tasks.js";
import globalErrorHandler from "./utils/globalErrorHandler.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(compression());

app.use("/auth", auth);
app.use("/api/tasks", tasks);

app.all("*", (req, res) => {
   res.status(404).json({
      message: `Can't find ${req.originalUrl} on this server!`,
   });
});

app.use(globalErrorHandler);

export default app;
