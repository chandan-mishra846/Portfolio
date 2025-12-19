import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import projectsRouter from './src/routes/projects.js';
import skillsRouter from './src/routes/skills.js';
import testimonialsRouter from './src/routes/testimonials.js';
import contactRouter from './src/routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));
app.use(express.json());

// Rate limiting for contact endpoint
const contactLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: 'Too many contact attempts, please try again later.'
});
app.use('/api/contact', contactLimiter);

// Routes
app.use('/api/projects', projectsRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/contact', contactRouter);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

async function start() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is required');
    await mongoose.connect(uri);
    console.log('MongoDB connected');

    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  } catch (err) {
    console.error('Startup error:', err.message);
    process.exit(1);
  }
}

start();
