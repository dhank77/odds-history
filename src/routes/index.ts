import { Router } from 'express';
import authController from '../controllers/authController';
import favoritesController from '../controllers/favoritesController';
import oddsHistoryController from '../controllers/oddsHistoryController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/auth/register', authController.register.bind(authController));
router.post('/auth/login', authController.login.bind(authController));
router.get('/auth/me', authenticate, authController.me.bind(authController));

router.get('/favorites', authenticate, favoritesController.getFavorites.bind(favoritesController));
router.post('/favorites', authenticate, favoritesController.addFavorite.bind(favoritesController));
router.delete('/favorites/:gameId', authenticate, favoritesController.removeFavorite.bind(favoritesController));

router.get('/odds/history/:gameId', oddsHistoryController.getHistory.bind(oddsHistoryController));
router.post('/jobs/ingest', oddsHistoryController.triggerIngestion.bind(oddsHistoryController));

export default router;
