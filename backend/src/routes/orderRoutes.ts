import express from 'express';
import { OrderController } from '../controllers/OrderController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = express.Router();
const orderController = new OrderController();

router.use(protect);

router.post('/', orderController.createOrder);
router.get('/myorders', orderController.getMyOrders);
router.get('/:id', orderController.getOrder);

router.use(authorize('admin'));
router.get('/', orderController.getAllOrders);
router.put('/:id/status', orderController.updateOrderStatus);

export default router;
