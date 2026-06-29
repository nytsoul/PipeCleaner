import express from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();
const reviewController = new ReviewController();

router.get('/product/:productId', reviewController.getProductReviews);

router.use(protect);
router.post('/', reviewController.createReview);

export default router;
