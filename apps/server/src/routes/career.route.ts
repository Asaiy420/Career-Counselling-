import { Router } from 'express';
import {
  searchCareers,
  getSuggestions,
  getCategories,
  getCareerById,
} from '../controllers/career.controller';
import {
  saveCareer,
  unsaveCareer,
  getSavedCareers,
} from '../controllers/savedCareer.controller';
import { authMiddleware } from '../middleware/middleware';

const router: Router = Router();

router.get('/search', searchCareers);
router.get('/suggestions', getSuggestions);
router.get('/categories', getCategories);


router.get('/saved', authMiddleware, getSavedCareers);
router.post('/saved', authMiddleware, saveCareer);
router.delete('/saved/:careerId', authMiddleware, unsaveCareer);

router.get('/:id', getCareerById);

export default router;