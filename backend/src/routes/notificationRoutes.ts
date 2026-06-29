import express from 'express';
import { NotificationController } from '../controllers/NotificationController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();
const notificationController = new NotificationController();

router.use(protect);

router.get('/', notificationController.getMyNotifications);
router.put('/:id/read', notificationController.markAsRead);

export default router;
