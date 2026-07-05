import express from 'express';

const router = express.Router();

let tasks = [];

router.get('/', (req, res) => {
  res.json(tasks);
});

router.post('/', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(tasks);
});

export default router;