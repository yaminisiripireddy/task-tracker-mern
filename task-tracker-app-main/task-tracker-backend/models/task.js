import express from "express";

const router = express.Router();

let tasks = [];

/* GET all tasks */
router.get("/", (req, res) => {
  res.json(tasks);
});

/* ADD task */
router.post("/", (req, res) => {
  const newTask = {
    id: Date.now(),
    text: req.body.text,
  };
  tasks.push(newTask);
  res.json(tasks);
});

app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, text: req.body.text } : task
  );

  res.json(tasks); // ❗ must return updated array
});
/* DELETE task */
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter((task) => task.id !== id);

  res.json(tasks);
});

export default router;