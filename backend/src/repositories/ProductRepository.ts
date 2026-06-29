import { BaseRepository } from './BaseRepository';
import { Product } from '../models/Product';

export class ProductRepository extends BaseRepository<any> {
  constructor() {
    super(Product);
  }

  async findActive() {
    return this.model.find({ isActive: true }).populate('category');
  }

  async searchAndFilterProducts(query: any, filters: any, sort: any, page: number = 1, limit: number = 10) {
    const pipeline: any[] = [];

    // Text search
    if (query) {
      pipeline.push({ $match: { $text: { $search: query } } });
    }

    // Match filters (category, price, isActive)
    const matchStage: any = { isActive: true };
    if (filters.category) matchStage.category = filters.category;
    if (filters.minPrice || filters.maxPrice) {
      matchStage.price = {};
      if (filters.minPrice) matchStage.price.$gte = Number(filters.minPrice);
      if (filters.maxPrice) matchStage.price.$lte = Number(filters.maxPrice);
    }
    
    pipeline.push({ $match: matchStage });

    // Sort
    if (sort) {
      pipeline.push({ $sort: sort });
    } else {
      pipeline.push({ $sort: { createdAt: -1 } });
    }

    // Pagination
    pipeline.push({ $skip: (page - 1) * limit });
    pipeline.push({ $limit: limit });

    // Lookup Category details
    pipeline.push({
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'categoryDetails'
      }
    });
    
    pipeline.push({
      $unwind: { path: '$categoryDetails', preserveNullAndEmptyArrays: true }
    });

    return this.model.aggregate(pipeline);
  }
}
