import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import Project from '../models/Project.js';
import { protect } from '../middleware/auth.js';

const router = Router();

// Public - list projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }).maxTimeMS(3000);
    if (projects && projects.length > 0) {
      return res.json(projects);
    }
  } catch (err) {
    console.warn('⚠️  Projects fetch error:', err.message);
  }
  
  // Mock projects fallback
  const mockProjects = [
    {
      _id: '1',
      title: 'Solar System Portfolio',
      description: 'Interactive 3D portfolio built with Three.js featuring planet-based navigation and immersive storytelling.',
      techStack: ['Three.js', 'React', 'Tailwind CSS'],
      image: '/projects/solar.jpg', // ensure an image exists, fallback will show stars
      status: 'Live',
      links: { github: '#' }
    },
    {
      _id: '2',
      title: 'CreditCheck AI',
      description: 'AI-powered credit analysis platform that provides instant credit scoring and financial insights using machine learning algorithms.',
      techStack: ['Python', 'Django', 'React', 'Node.js', 'Machine Learning'],
      image: '/projects/creditcheck.jpg',
      status: 'Live',
      links: { live: 'https://creditcheck.example.com', github: 'https://github.com/user/creditcheck' }
    },
    {
      _id: '3',
      title: 'Jarvis Voice Assistant',
      description: 'AI-powered multilingual voice assistant with speech recognition, automation, and real-time interaction.',
      techStack: ['Python', 'OpenAI', 'SQLite'],
      image: '/projects/jarvis.jpg',
      status: 'Completed'
    },
    {
      _id: '4',
      title: 'Shabari Restaurant Web App',
      description: 'Full-stack restaurant management system with online ordering, inventory management, and real-time order tracking.',
      techStack: ['React', 'Express', 'MongoDB'],
      image: '/projects/shabari.jpg',
      status: 'Completed',
      links: { live: 'https://shabari.example.com', github: 'https://github.com/user/shabari' }
    }
  ];
  
  res.json(mockProjects);
});

// Public - single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).maxTimeMS(3000);
    if (project) {
      return res.json(project);
    }
  } catch (err) {
    console.warn('⚠️  Project fetch error:', err.message);
  }
  
  // Return mock project
  res.status(404).json({ message: 'Not found' });
});

// Admin create
router.post('/', protect, [
  body('title').notEmpty(),
  body('description').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const project = await Project.create(req.body);
  res.status(201).json(project);
});

// Admin update
router.put('/:id', protect, async (req, res) => {
  const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

// Admin delete
router.delete('/:id', protect, async (req, res) => {
  const deleted = await Project.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ message: 'Deleted' });
});

export default router;
