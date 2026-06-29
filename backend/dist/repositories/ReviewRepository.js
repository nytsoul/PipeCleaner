"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Review_1 = require("../models/Review");
class ReviewRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Review_1.Review);
    }
    async findByProductId(productId) {
        return this.model.find({ product: productId, isApproved: true }).populate('user', 'name');
    }
}
exports.ReviewRepository = ReviewRepository;
