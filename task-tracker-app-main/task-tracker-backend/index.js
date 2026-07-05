import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Task from "./models/Task.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// DB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// GET all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// CREATE task
app.post("/tasks", async (req, res) => {
  const task = new Task({ name: req.body.name });
  await task.save();

  const tasks = await Task.find();
  res.json(tasks);
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  const tasks = await Task.find();
  res.json(tasks);
});

// UPDATE task
app.put("/tasks/:id", async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  });

  const tasks = await Task.find();
  res.json(tasks);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});