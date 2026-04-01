import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
  hero: {
    headline: { type: String, default: 'Dhyey Pavagadhi' },
    subheadline: { type: String, default: 'Creative Developer / Full Stack Developer' },
    cta: { type: String, default: 'View My Work' }
  },
  about: {
    title: { type: String, default: 'About' },
    body: { type: String, default: 'Building clean, scalable digital products with intent and clarity.' },
    image: { type: String, default: '' }
  },
  services: [{
    title: String,
    description: String
  }],
  contact: {
    email: { type: String, default: 'hello@example.com' },
    whatsapp: { type: String, default: '' }
  },
  chatbot: {
    systemPrompt: { type: String, default: 'You are Dhyey Pavagadhi\'s assistant. Answer concisely about his work.' }
  },
  assets: {
    logo: { type: String, default: '' },
    audio: { type: String, default: '' },
    audioEnabled: { type: Boolean, default: false }
  }
}, { timestamps: true });

export default mongoose.model('Setting', SettingSchema);
