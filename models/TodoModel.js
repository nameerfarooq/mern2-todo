import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema(
  {
    title: String,
    isCompleted: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);
export const Todo = mongoose.model("Todo", TodoSchema); // todo
