import { BaseRepository } from './BaseRepository';
import { Coupon } from '../models/Coupon';

export class CouponRepository extends BaseRepository<any> {
  constructor() {
    super(Coupon);
  }

  async findValidCoupon(code: string) {
    return this.model.findOne({
      code: code.toUpperCase(),
      isActive: true,
      validFrom: { $lte: new Date() },
      validUntil: { $gte: new Date() }
    });
  }
}
