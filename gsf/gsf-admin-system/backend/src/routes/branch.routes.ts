import { Router } from 'express';
import { getBranches, createBranch, updateBranch, deleteBranch } from '../controllers/branch.controller';
import { authenticateAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public – anyone can fetch branches (used on public website map)
router.get('/', getBranches);

// Admin-protected – create, update, delete
router.post('/', authenticateAdmin, createBranch);
router.put('/:id', authenticateAdmin, updateBranch);
router.delete('/:id', authenticateAdmin, deleteBranch);

export default router;
