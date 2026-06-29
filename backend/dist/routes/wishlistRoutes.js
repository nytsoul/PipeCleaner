"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const WishlistController_1 = require("../controllers/WishlistController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const wishlistController = new WishlistController_1.WishlistController();
router.use(authMiddleware_1.protect);
router.get('/', wishlistController.getWishlist);
router.post('/', wishlistController.addProduct);
router.delete('/:productId', wishlistController.removeProduct);
exports.default = router;
