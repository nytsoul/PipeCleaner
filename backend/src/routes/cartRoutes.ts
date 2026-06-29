import express from 'express';
import { CartController } from '../controllers/CartController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();
const cartController = new CartController();

router.use(protect);

router.get('/', cartController.getCart);
router.post('/', cartController.addItem);
router.delete('/:itemId', cartController.removeItem);
router.delete('/', cartController.clearCart);

export default router;
