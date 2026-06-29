import { BaseRepository } from './BaseRepository';
import { Payment } from '../models/Payment';

export class PaymentRepository extends BaseRepository<any> {
  constructor() {
    super(Payment);
  }

  async findByUserId(userId: string) {
    return this.model.find({ user: userId }).sort('-createdAt');
  }
}
