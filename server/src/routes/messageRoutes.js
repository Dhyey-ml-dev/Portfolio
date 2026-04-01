import { Router } from 'express';
import Message from '../models/Message.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Admin: list messages
router.get('/', protect, async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

export default router;
