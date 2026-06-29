"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const PaymentRepository_1 = require("../repositories/PaymentRepository");
const OrderRepository_1 = require("../repositories/OrderRepository");
const AppError_1 = require("../utils/AppError");
class PaymentService {
    paymentRepository;
    orderRepository;
    constructor() {
        this.paymentRepository = new PaymentRepository_1.PaymentRepository();
        this.orderRepository = new OrderRepository_1.OrderRepository();
    }
    async processPayment(userId, orderId, paymentData) {
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new AppError_1.AppError('Order not found', 404);
        }
        if (order.user.toString() !== userId) {
            throw new AppError_1.AppError('Not authorized', 401);
        }
        // In a real app, call Stripe/Razorpay API here
        const transactionId = `txn_${Math.random().toString(36).substr(2, 9)}`;
        const payment = await this.paymentRepository.create({
            user: userId,
            order: orderId,
            provider: paymentData.provider || 'Stripe',
            transactionId,
            amount: order.total,
            currency: 'INR',
            status: 'SUCCESS'
        });
        order.paymentStatus = 'PAID';
        await order.save();
        return payment;
    }
    async getUserPayments(userId) {
        return this.paymentRepository.findByUserId(userId);
    }
}
exports.PaymentService = PaymentService;
