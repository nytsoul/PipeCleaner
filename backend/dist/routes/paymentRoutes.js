"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PaymentController_1 = require("../controllers/PaymentController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const paymentController = new PaymentController_1.PaymentController();
router.use(authMiddleware_1.protect);
router.post('/', paymentController.processPayment);
router.get('/', paymentController.getMyPayments);
exports.default = router;
