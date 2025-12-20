import express from 'express';
import { requireAdmin } from '../utils/adminAuth.js';
import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonialController.js';

const router = express.Router();

router.get('/', getAllTestimonials);
router.post('/', requireAdmin, createTestimonial);
router.put('/:id', requireAdmin, updateTestimonial);
router.delete('/:id', requireAdmin, deleteTestimonial);

export default router;
