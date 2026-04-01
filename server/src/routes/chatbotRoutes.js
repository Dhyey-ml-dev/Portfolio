import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import axios from 'axios';

const router = Router();

router.post('/', [body('message').isLength({ min: 1 })], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { message } = req.body;

  try {
    // Proxy request to Python chatbot backend
    let pythonChatbotUrl = process.env.CHATBOT_URL || 'http://127.0.0.1:8000/chat';
    
    // In case there is connection issue with python backend natively
    const response = await axios.post(pythonChatbotUrl, { message });
    
    // The python script returns { botResponse: "..." }
    res.json({ response: response.data.botResponse });
  } catch (error) {
    console.error('Chatbot API Error:', error.message);
    // Fallback response if python server is offline
    res.json({ response: "I'm having trouble connecting to my brain right now, but feel free to reach out via the contact form!" });
  }
});

export default router;
