import { Todo } from "../models/TodoModel.js";

// API for adding todos
export const addTodo = async (req, res) => {
  try {
    const { title, isCompleted } = req.body; //destructuring

    if (!title) {
      return res.status(500).json({ error: "Title not found" });
    }
    if (isCompleted == undefined) {
      return res.status(500).json({ error: "isCompleted not found" });
    }

    const todo = Todo({
      title: title,
      isCompleted: isCompleted,
      user: req.userId
    });

    await todo.save();

    return res.status(201).json({ message: "Success", data: todo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId });
    res.status(200).json({ data: todos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//API for getting a todo by ID
export const getTodoByID = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json({ data: todo });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// API for deleting a todo

export const deleteTodoByID = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo Deleted" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// API for deleting all Todo

export const deleteAllTodos = async (req, res) => {
  try {
    const todo = await Todo.deleteMany();
    res.status(200).json({ message: "Todos Deleted" });
  } catch (error) {
    res.json({ error: error.message });
  }
};

export const printMyName = (req, res) => {
  return res.json({ data: "Muhammad Nameer" });
};
export const updatetodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body);
    return res.status(201).json({ message: "Success", data: req.body });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
