import express from 'express';
import Joi from 'joi';
import Skill from '../models/Skill.js';
import { requireAdmin } from '../utils/adminAuth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const skills = await Skill.find().sort({ createdAt: -1 });
  res.json(skills);
});

const skillSchema = Joi.object({
  name: Joi.string().required(),
  icon: Joi.string().uri().allow(''),
  proficiency: Joi.number().min(0).max(100).default(50)
});

router.post('/', requireAdmin, async (req, res) => {
  const { error, value } = skillSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  const created = await Skill.create(value);
  res.status(201).json(created);
});

router.put('/:id', requireAdmin, async (req, res) => {
  const { error, value } = skillSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  const updated = await Skill.findByIdAndUpdate(req.params.id, value, { new: true });
  res.json(updated);
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
