import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
  res.json({ message: "Update stats working" });
});

export default router;