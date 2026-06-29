import { BaseRepository } from './BaseRepository';
import { Order } from '../models/Order';

export class OrderRepository extends BaseRepository<any> {
  constructor() {
    super(Order);
  }

  async findByUserId(userId: string) {
    return this.model.find({ user: userId }).sort('-createdAt');
  }

  async findOrderWithUser(id: string) {
    return this.model.findById(id).populate('user', 'name email');
  }

  async findAllOrdersWithUser() {
    return this.model.find().populate('user', 'id name');
  }

  async getSalesAnalytics(startDate: Date, endDate: Date) {
    return this.model.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: { $in: ['DELIVERED', 'SHIPPED', 'PROCESSING'] }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalRevenue: { $sum: "$total" },
          totalOrders: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
  }
}
