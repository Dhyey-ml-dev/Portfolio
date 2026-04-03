import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { connectDB } from './config/db.js';
import User from './models/User.js';
import Setting from './models/Setting.js';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const envPath = path.resolve(__dirname, '../../.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

const app = express();
const PORT = process.env.BACKEND_PORT || process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/contact', contactRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the Portfolio API!', status: 'Running' });
});

app.get('/', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Portfolio API running',
    endpoints: {
      projects: '/api/projects',
      settings: '/api/settings',
      contact: '/api/contact',
      login: '/api/auth/login'
    },
    note: 'MongoDB not connected but API is ready',
    frontend: 'http://localhost:5173'
  });
});

async function seedDefaults() {
  // Seed admin user
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'password123';

  const existingAdmin = await User.findOne({ email: adminEmail });
  if (!existingAdmin) {
    await User.create({ email: adminEmail, password: adminPassword, name: 'Admin' });
    console.log(`Seeded admin user: ${adminEmail} / ${adminPassword}`);
  }

  // Seed settings
  const settingsCount = await Setting.countDocuments();
  if (settingsCount === 0) {
    await Setting.create({
      services: [
        { title: 'Web Development', description: 'Building responsive, high-performance websites using React and modern stacks.' },
        { title: 'UI/UX Design', description: 'Designing clean, premium interfaces focused on clarity and intent.' },
        { title: 'Backend & APIs', description: 'Architecting secure, scalable APIs with Node.js and MongoDB.' },
        { title: 'AI Solutions', description: 'Integrating ML/AI features to deliver smarter user experiences.' }
      ],
      contact: { email: 'hello@example.com', whatsapp: 'https://wa.me/1234567890' }
    });
    console.log('Seeded default settings');
  }
}

async function start() {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio';
  const dbConnected = await connectDB(mongoUri);
  
  if (dbConnected) {
    try {
      await seedDefaults();
    } catch (err) {
      console.warn('⚠️  Could not seed defaults:', err.message);
    }
  } else {
    console.log('⚠️  Running in mock mode (no database)');
    console.log('   To enable MongoDB features:');
    console.log('   1. Install: brew install mongodb-community');
    console.log('   2. Start: mongod');
    console.log('   3. Restart backend');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n✅ Server running on http://localhost:${PORT}`);
    console.log(`📡 API: http://localhost:${PORT}/api`);
    console.log(`🎨 Frontend: http://localhost:5173`);
    console.log(`🔐 Admin: http://localhost:5173/admin\n`);
  });
}

start();
