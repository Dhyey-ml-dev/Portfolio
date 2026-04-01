import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load env
dotenv.config();

// Define Project Schema inline to avoid dependency issues in script
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'Completed' },
  image: String,
  link: String,
  createdAt: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', projectSchema);

const seedProjects = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio');
    console.log('Connected to MongoDB');

    // Wipe existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert new projects
    const newProjects = [
      { 
        title: 'CreditCheck AI', 
        description: 'Intelligent credit risk prediction system using machine learning with explainable AI (SHAP).', 
        image: '/uploads/project_creditcheck.png', 
        status: 'Completed' 
      },
      { 
        title: 'Solar System Portfolio', 
        description: 'Interactive 3D portfolio using Three.js with planet-based navigation and immersive experience.', 
        image: '/uploads/project_solar.png', 
        status: 'Completed' 
      },
      { 
        title: 'Jarvis Voice Assistant', 
        description: 'AI-powered multilingual voice assistant with speech recognition, automation, and real-time interaction.', 
        image: '/uploads/project_jarvis.jpg', 
        status: 'Completed' 
      },
      { 
        title: 'Shabari Restaurant Web App', 
        description: 'Full-stack restaurant platform with admin panel for real-time menu and category management.', 
        image: '/uploads/project_shabari.jpg', 
        status: 'Completed' 
      }
    ];

    await Project.insertMany(newProjects);
    console.log('Successfully seeded 4 real projects!');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
};

seedProjects();
