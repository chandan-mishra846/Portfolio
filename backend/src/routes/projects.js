import express from 'express';
import Joi from 'joi';
import Project from '../models/Project.js';
import { requireAdmin } from '../utils/adminAuth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

const projectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().uri().allow(''),
  liveLink: Joi.string().uri().allow(''),
  githubLink: Joi.string().uri().allow(''),
  techStack: Joi.array().items(Joi.string()).default([])
});

router.post('/', requireAdmin, async (req, res) => {
  const { error, value } = projectSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  const created = await Project.create(value);
  res.status(201).json(created);
});

router.put('/:id', requireAdmin, async (req, res) => {
  const { error, value } = projectSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });
  const updated = await Project.findByIdAndUpdate(req.params.id, value, { new: true });
  res.json(updated);
});

router.delete('/:id', requireAdmin, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

export default router;
