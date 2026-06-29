"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const OrderRepository_1 = require("../repositories/OrderRepository");
const AppError_1 = require("../utils/AppError");
class OrderService {
    orderRepository;
    constructor() {
        this.orderRepository = new OrderRepository_1.OrderRepository();
    }
    async createOrder(data, userId) {
        const orderData = { ...data, user: userId };
        return this.orderRepository.create(orderData);
    }
    async getOrderById(id) {
        const order = await this.orderRepository.findOrderWithUser(id);
        if (!order) {
            throw new AppError_1.AppError('Order not found', 404);
        }
        return order;
    }
    async getMyOrders(userId) {
        return this.orderRepository.findByUserId(userId);
    }
    async getAllOrders() {
        return this.orderRepository.findAllOrdersWithUser();
    }
    async updateOrderStatus(id, status) {
        const order = await this.orderRepository.findById(id);
        if (!order) {
            throw new AppError_1.AppError('Order not found', 404);
        }
        order.status = status;
        await order.save();
        return order;
    }
}
exports.OrderService = OrderService;
