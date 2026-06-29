"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Order_1 = require("../models/Order");
class OrderRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Order_1.Order);
    }
    async findByUserId(userId) {
        return this.model.find({ user: userId }).sort('-createdAt');
    }
    async findOrderWithUser(id) {
        return this.model.findById(id).populate('user', 'name email');
    }
    async findAllOrdersWithUser() {
        return this.model.find().populate('user', 'id name');
    }
    async getSalesAnalytics(startDate, endDate) {
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
exports.OrderRepository = OrderRepository;
