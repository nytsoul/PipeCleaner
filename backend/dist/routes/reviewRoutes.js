"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ReviewController_1 = require("../controllers/ReviewController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const reviewController = new ReviewController_1.ReviewController();
router.get('/product/:productId', reviewController.getProductReviews);
router.use(authMiddleware_1.protect);
router.post('/', reviewController.createReview);
exports.default = router;
