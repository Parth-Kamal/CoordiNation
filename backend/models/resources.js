import { Schema, model } from "mongoose";
import { type } from "os";

const resourceSchema = new Schema(
   {
      title: {
         type: String,
         required: [true, "Resource should have a title"],
      },
      description: {
         type: String,
         required: [true, "Resource should have a description"],
      },
      department: {
         type: String,
         required: [true, "Resource should be from a department"],
      },
      budgetAllocated: {
         type: Number,
         required: [true, "Resource should have a budget allocated"],
      },
      imageUrl: {
         type: String,
         default: null,
      },
   },
   { timestamps: true },
);

const Resources = model("Resources", resourceSchema);

export default Resources;
