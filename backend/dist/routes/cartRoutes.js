"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CartController_1 = require("../controllers/CartController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const cartController = new CartController_1.CartController();
router.use(authMiddleware_1.protect);
router.get('/', cartController.getCart);
router.post('/', cartController.addItem);
router.delete('/:itemId', cartController.removeItem);
router.delete('/', cartController.clearCart);
exports.default = router;
