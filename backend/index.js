import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

import app from "./app.js";

const PORT = process.env.PORT || 8000;

mongoose
   .connect(process.env.DB || "mongodb://127.0.0.1:27017/platform")
   .then(() => console.log("DB connection successful"));


app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
