import Joi from 'joi';
import Testimonial from '../models/Testimonial.js';

const testimonialSchema = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().allow(''),
  message: Joi.string().required(),
  image: Joi.string().uri().allow('')
});

export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    const { error, value } = testimonialSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const created = await Testimonial.create(value);
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { error, value } = testimonialSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });
    const updated = await Testimonial.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!updated) return res.status(404).json({ error: 'Testimonial not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Testimonial not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
};
