import { PaymentRepository } from '../repositories/PaymentRepository';
import { OrderRepository } from '../repositories/OrderRepository';
import { AppError } from '../utils/AppError';

export class PaymentService {
  private paymentRepository: PaymentRepository;
  private orderRepository: OrderRepository;

  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.orderRepository = new OrderRepository();
  }

  async processPayment(userId: string, orderId: string, paymentData: any) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new AppError('Order not found', 404);
    }

    if (order.user.toString() !== userId) {
      throw new AppError('Not authorized', 401);
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

  async getUserPayments(userId: string) {
    return this.paymentRepository.findByUserId(userId);
  }
}
