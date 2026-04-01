import { Router } from 'express';
import Setting from '../models/Setting.js';
import { protect } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const settings = await Setting.findOne().maxTimeMS(3000);
    if (settings) {
      return res.json(settings);
    }
  } catch (err) {
    console.warn('⚠️  Settings fetch error:', err.message);
  }
  
  // Mock data fallback
  const mockSettings = {
    hero: {
      headline: 'Welcome to My Portfolio',
      subheadline: 'Full-Stack Developer | React • Node.js • MongoDB',
      ctaText: 'View My Work',
      ctaLink: '#projects'
    },
    about: {
      title: 'About Me',
      description: 'I build beautiful, functional web applications using modern technologies. With expertise in React, Node.js, and MongoDB, I create scalable solutions that make an impact.'
    },
    services: [
      { name: 'Frontend Development', description: 'React, Vue, Tailwind CSS' },
      { name: 'Backend Development', description: 'Node.js, Express, REST APIs' },
      { name: 'Database Design', description: 'MongoDB, PostgreSQL, Schema Design' },
      { name: 'Full-Stack Solutions', description: 'End-to-end application development' }
    ],
    contact: {
      email: 'hello@example.com',
      phone: '+1 (555) 123-4567',
      address: 'San Francisco, CA'
    },
    chatbotPrompt: 'You are a helpful assistant. Answer questions about the portfolio.',
    audioEnabled: true,
    logoPath: '/uploads/logo.png'
  };
  
  res.json(mockSettings);
});

router.put('/', protect, async (req, res) => {
  const existing = await Setting.findOne();
  if (!existing) {
    const created = await Setting.create(req.body);
    return res.json(created);
  }
  const updated = await Setting.findByIdAndUpdate(existing._id, req.body, { new: true });
  res.json(updated);
});

export default router;
