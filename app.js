import express from "express";
import dotenv from "dotenv";
import { connectWithDB } from "./db.js";
import todoRouter from "./routes/todoRoutes.js";
import patientRouter from "./routes/patientRoutes.js";
import authRouter from "./routes/authRoutes.js";
import authMiddleware from "./middlewares/authMiddleware.js";
const app = express();
app.use(express.json());
dotenv.config();
connectWithDB();

app.use("/todo-app",authMiddleware, todoRouter);
app.use("/patient-app", patientRouter);
app.use("/auth", authRouter);

app.listen(5000, () => {
  console.log("APP STARTED");
});
