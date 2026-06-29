"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const ReviewService_1 = require("../services/ReviewService");
const catchAsync_1 = require("../utils/catchAsync");
const reviewService = new ReviewService_1.ReviewService();
class ReviewController {
    createReview = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const review = await reviewService.createReview(req.body.product, req.user.id, req.body);
        res.status(201).json({ success: true, data: review });
    });
    getProductReviews = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const reviews = await reviewService.getProductReviews(req.params.productId);
        res.status(200).json({ success: true, count: reviews.length, data: reviews });
    });
}
exports.ReviewController = ReviewController;
