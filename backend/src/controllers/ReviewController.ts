import { Request, Response } from 'express';
import { ReviewService } from '../services/ReviewService';
import { catchAsync } from '../utils/catchAsync';

const reviewService = new ReviewService();

export class ReviewController {
  public createReview = catchAsync(async (req: Request, res: Response) => {
    const review = await reviewService.createReview(req.body.product, req.user.id, req.body);
    res.status(201).json({ success: true, data: review });
  });

  public getProductReviews = catchAsync(async (req: Request, res: Response) => {
    const reviews = await reviewService.getProductReviews(req.params.productId as string);
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  });
}
