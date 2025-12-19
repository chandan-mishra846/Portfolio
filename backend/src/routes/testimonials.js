import express from 'express';
import Joi from 'joi';
import Testimonial from '../models/Testimonial.js';
import { requireAdmin } from '../utils/adminAuth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const testimonials = await Testimonial.find().sort({ createdAt: -1 });
  res.json(testimonials);
});

const testimonialSchema = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().allow(''),
  message: Joi.string().required(),
  image: Joi.string().uri().allow('')
});

router.post('/', requireAdmin, async (req, res) => {
  const { error, value } = testimonialSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  const created = await Testimonial.create(value);
  res.status(201).json(created);
});

router.put('/:id', requireAdmin, async (req, res) => {
  const { error, value } = testimonialSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  const updated = await Testimonial.findByIdAndUpdate(req.params.id, value, { new: true });
  res.json(updated);
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
