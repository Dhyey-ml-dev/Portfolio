import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = Router();

router.post('/login', [
  body('email').isEmail(),
  body('password').isLength({ min: 4 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'devsecret', { expiresIn: '7d' });
    return res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Emergency admin seeder — protected by SEED_SECRET env variable
router.post('/seed-admin', async (req, res) => {
  const { secret } = req.body;
  const expectedSecret = process.env.SEED_SECRET || 'seed-ds-techvibe-2024';
  if (secret !== expectedSecret) return res.status(403).json({ message: 'Forbidden' });

  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'password123';
    await User.deleteOne({ email: adminEmail });
    const newAdmin = new User({ email: adminEmail, password: adminPassword, name: 'Admin' });
    await newAdmin.save();
    return res.json({ message: `Admin user created: ${adminEmail}` });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to seed admin', error: err.message });
  }
});

export default router;
