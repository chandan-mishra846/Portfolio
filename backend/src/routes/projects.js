import express from 'express';
import { requireAdmin } from '../utils/adminAuth.js';
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

router.get('/', getAllProjects);
router.post('/', requireAdmin, createProject);
router.put('/:id', requireAdmin, updateProject);
router.delete('/:id', requireAdmin, deleteProject);

export default router;
