import express from "express";

const router = express.Router();

let tasks = [];

// ✅ GET all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// ✅ ADD task
router.post("/", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Task text is required" });
  }

  const newTask = {
    id: Date.now(),   // unique id
    text,
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json(tasks);
});

// ✅ DELETE task
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter(task => task.id !== id);

  res.json(tasks);
});

// ✅ TOGGLE COMPLETE
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  console.log("BODY:", req.body);
  res.json(tasks);
});

export default router;