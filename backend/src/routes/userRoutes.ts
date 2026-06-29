import express from 'express';
import { UserController } from '../controllers/UserController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = express.Router();
const userController = new UserController();

router.use(protect);

router.get('/me', userController.getMe);
router.put('/me', userController.updateMe);

router.use(authorize('admin'));
router.get('/', userController.getAllUsers);

export default router;
