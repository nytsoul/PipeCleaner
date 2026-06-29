import { ReviewRepository } from '../repositories/ReviewRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { AppError } from '../utils/AppError';

export class ReviewService {
  private reviewRepository: ReviewRepository;
  private productRepository: ProductRepository;

  constructor() {
    this.reviewRepository = new ReviewRepository();
    this.productRepository = new ProductRepository();
  }

  async createReview(productId: string, userId: string, data: any) {
    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new AppError('Product not found', 404);
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

  async getProductReviews(productId: string) {
    return this.reviewRepository.findByProductId(productId);
  }
}
