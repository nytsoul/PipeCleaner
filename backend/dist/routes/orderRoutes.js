"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OrderController_1 = require("../controllers/OrderController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const orderController = new OrderController_1.OrderController();
router.use(authMiddleware_1.protect);
router.post('/', orderController.createOrder);
router.get('/myorders', orderController.getMyOrders);
router.get('/:id', orderController.getOrder);
router.use((0, authMiddleware_1.authorize)('admin'));
router.get('/', orderController.getAllOrders);
router.put('/:id/status', orderController.updateOrderStatus);
exports.default = router;
