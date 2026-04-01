import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import Setting from '../models/Setting.js';
import { protect } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../uploads'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});

const upload = multer({ storage });
const router = Router();

router.post('/logo', protect, upload.single('logo'), async (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;
  const settings = await Setting.findOne();
  if (settings) {
    settings.assets.logo = filePath;
    await settings.save();
  }
  res.json({ path: filePath });
});

router.post('/audio', protect, upload.single('audio'), async (req, res) => {
  const filePath = `/uploads/${req.file.filename}`;
  const settings = await Setting.findOne();
  if (settings) {
    settings.assets.audio = filePath;
    await settings.save();
  }
  res.json({ path: filePath });
});

export default router;
