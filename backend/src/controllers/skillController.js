import Joi from 'joi';
import Skill from '../models/Skill.js';

const skillSchema = Joi.object({
  name: Joi.string().required(),
  icon: Joi.string().uri().allow(''),
  proficiency: Joi.number().min(0).max(100).default(50)
});

export const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { error, value } = skillSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const created = await Skill.create(value);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create skill' });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { error, value } = skillSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const updated = await Skill.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!updated) return res.status(404).json({ error: 'Skill not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update skill' });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const deleted = await Skill.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Skill not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
};
