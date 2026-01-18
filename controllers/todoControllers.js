import { Todo } from "../models/TodoModel.js";
import OpenAI from "openai";

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

// API for generating AI-powered todos for final year project
export const generateAITodos = async (req, res) => {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ 
        error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your .env file" 
      });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Prompt for generating daily tasks for a CS final year project
    const prompt = `Generate 5-7 daily tasks for a computer science final year project student. 
    These should be practical, actionable tasks that help progress on a final year project. 
    Include tasks related to:
    - Research and documentation
    - Development and coding
    - Testing and debugging
    - Project planning and design
    - Literature review and analysis
    
    Return ONLY a JSON array of objects, each with "title" (string) and "isCompleted" (boolean) fields.
    Example format: [{"title": "Review research papers on machine learning", "isCompleted": false}, {"title": "Implement user authentication module", "isCompleted": false}]
    Do not include any other text, only the JSON array.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates structured task lists for computer science students working on their final year projects. Always respond with valid JSON arrays only."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiResponse = completion.choices[0].message.content.trim();
    
    // Parse the JSON response
    let todos;
    try {
      // Remove any markdown code blocks if present
      const cleanedResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      todos = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      return res.status(500).json({ 
        error: "Failed to parse AI response",
        details: aiResponse 
      });
    }

    // Validate the structure
    if (!Array.isArray(todos)) {
      return res.status(500).json({ 
        error: "Invalid response format from AI" 
      });
    }

    // Optionally save todos to database (commented out - uncomment if you want to auto-save)
    const savedTodos = await Promise.all(
      todos.map(todo => {
        const newTodo = Todo({
          title: todo.title,
          isCompleted: todo.isCompleted || false,
          user: req.userId
        });
        return newTodo.save();
      })
    );

    return res.status(200).json({ 
      message: "AI-generated todos retrieved successfully",
      data: todos,
      count: todos.length
    });
  } catch (error) {
    console.error("Error generating AI todos:", error);
    res.status(500).json({ 
      error: error.message || "Failed to generate AI todos" 
    });
  }
};
