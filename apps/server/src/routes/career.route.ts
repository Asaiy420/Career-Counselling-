import { Router } from 'express';
import {
  searchCareers,
  getSuggestions,
  getCategories,
  getCareerById,
} from '../controllers/career.controller';

const router: Router = Router();

router.get('/search', searchCareers);
router.get('/suggestions', getSuggestions);
router.get('/categories', getCategories);
router.get('/:id', getCareerById);

export default router;