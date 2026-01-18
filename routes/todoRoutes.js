import express from "express";
import {
  addTodo,
  deleteAllTodos,
  deleteTodoByID,
  getTodoByID,
  getTodos,
  updatetodo,
} from "../controllers/todoControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/todo", addTodo);
router.get("/todo", getTodos);
router.get("/todo/:id", getTodoByID);
router.delete("/todo/:id", deleteTodoByID);
router.delete("/todo", deleteAllTodos);
router.patch("/todo/:id", updatetodo);

export default router;
