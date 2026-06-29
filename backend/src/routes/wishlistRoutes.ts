import express from 'express';
import { WishlistController } from '../controllers/WishlistController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();
const wishlistController = new WishlistController();

router.use(protect);

router.get('/', wishlistController.getWishlist);
router.post('/', wishlistController.addProduct);
router.delete('/:productId', wishlistController.removeProduct);

export default router;
