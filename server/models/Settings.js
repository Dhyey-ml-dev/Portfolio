import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  logo: {
    type: String,
    default: '/logo.png'
  },
  audio: {
    type: String
  },
  about: {
    type: String,
    default: 'Welcome to DS Quirk & Co.'
  },
  services: {
    type: [String],
    default: ['Web Development', 'UI/UX Design', 'Artificial Intelligence']
  },
  contactInfo: {
    email: String,
    phone: String,
    address: String
  }
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
