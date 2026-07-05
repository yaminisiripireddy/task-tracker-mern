import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

/* GET */
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

/* ADD */
app.post("/api/tasks", (req, res) => {
  const newTask = {
    id: Date.now().toString(),
    text: req.body.text,
  };

  tasks.push(newTask);
  res.json([...tasks]);
});

/* UPDATE */
app.put("/api/tasks/:id", (req, res) => {
  const id = req.params.id;

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, text: req.body.text } : task
  );

  res.json([...tasks]);
});

/* DELETE */
app.delete("/api/tasks/:id", (req, res) => {
  const id = req.params.id;

  tasks = tasks.filter((task) => task.id !== id);

  res.json([...tasks]);
});

app.listen(5000, () => console.log("Server running on port 5000"));