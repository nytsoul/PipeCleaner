import express from 'express';
import { PaymentController } from '../controllers/PaymentController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();
const paymentController = new PaymentController();

router.use(protect);

router.post('/', paymentController.processPayment);
router.get('/', paymentController.getMyPayments);

export default router;
