import { OrderRepository } from '../repositories/OrderRepository';
import { AppError } from '../utils/AppError';

export class OrderService {
  private orderRepository: OrderRepository;

  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrder(data: any, userId: string) {
    const orderData = { ...data, user: userId };
    return this.orderRepository.create(orderData);
  }

  async getOrderById(id: string) {
    const order = await this.orderRepository.findOrderWithUser(id as string);
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    return order;
  }

  async getMyOrders(userId: string) {
    return this.orderRepository.findByUserId(userId);
  }

  async getAllOrders() {
    return this.orderRepository.findAllOrdersWithUser();
  }

  async updateOrderStatus(id: string, status: string) {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new AppError('Order not found', 404);
    }
    order.status = status;
    await order.save();
    return order;
  }
}
