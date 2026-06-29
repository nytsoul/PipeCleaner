import { BaseRepository } from './BaseRepository';
import { Review } from '../models/Review';

export class ReviewRepository extends BaseRepository<any> {
  constructor() {
    super(Review);
  }

  async findByProductId(productId: string) {
    return this.model.find({ product: productId, isApproved: true }).populate('user', 'name');
  }
}
