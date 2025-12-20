import Joi from 'joi';
import Project from '../models/Project.js';

const projectSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().uri().allow(''),
  liveLink: Joi.string().uri().allow(''),
  githubLink: Joi.string().uri().allow(''),
  techStack: Joi.array().items(Joi.string()).default([])
});

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const createProject = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const created = await Project.create(value);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { error, value } = projectSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const updated = await Project.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!updated) return res.status(404).json({ error: 'Project not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Project not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
