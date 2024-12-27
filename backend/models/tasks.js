import { Schema, model } from "mongoose";

const taskSchema = new Schema(
   {
      title: {
         type: String,
         required: [true, "Task should have a title"],
      },
      status: {
         type: String,
         enum: ["pending", "ongoing"],
         default: "pending",
      },
      department: {
         type: String,
         required: [true, "Task should be from a department"],
      },
   },
   { timestamps: true },
);

export default model("Tasks", taskSchema);
