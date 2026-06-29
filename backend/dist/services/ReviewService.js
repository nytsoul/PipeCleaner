"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const ReviewRepository_1 = require("../repositories/ReviewRepository");
const ProductRepository_1 = require("../repositories/ProductRepository");
const AppError_1 = require("../utils/AppError");
class ReviewService {
    reviewRepository;
    productRepository;
    constructor() {
        this.reviewRepository = new ReviewRepository_1.ReviewRepository();
        this.productRepository = new ProductRepository_1.ProductRepository();
    }
    async createReview(productId, userId, data) {
        const product = await this.productRepository.findById(productId);
        if (!product) {
            throw new AppError_1.AppError('Product not found', 404);
        }
        const review = await this.reviewRepository.create({
            ...data,
            product: productId,
            user: userId
        });
        // Update product stats
        const reviews = await this.reviewRepository.find({ product: productId });
        const numReviews = reviews.length;
        const averageRating = reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews;
        await this.productRepository.updateById(productId, { numReviews, averageRating });
        return review;
    }
    async getProductReviews(productId) {
        return this.reviewRepository.findByProductId(productId);
    }
}
exports.ReviewService = ReviewService;
