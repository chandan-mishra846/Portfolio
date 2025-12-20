import express from 'express';
import { requireAdmin } from '../utils/adminAuth.js';
import {
  getAllSkills,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController.js';

const router = express.Router();

router.get('/', getAllSkills);
router.post('/', requireAdmin, createSkill);
router.put('/:id', requireAdmin, updateSkill);
router.delete('/:id', requireAdmin, deleteSkill);

export default router;
