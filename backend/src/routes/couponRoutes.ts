import express from 'express';
import { CouponController } from '../controllers/CouponController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = express.Router();
const couponController = new CouponController();

router.post('/validate', couponController.validateCoupon);

router.use(protect, authorize('admin'));
router.post('/', couponController.createCoupon);

export default router;
