import { CouponRepository } from '../repositories/CouponRepository';
import { AppError } from '../utils/AppError';

export class CouponService {
  private couponRepository: CouponRepository;

  constructor() {
    this.couponRepository = new CouponRepository();
  }

  async createCoupon(data: any) {
    return this.couponRepository.create(data);
  }

  async validateCoupon(code: string, orderValue: number) {
    const coupon = await this.couponRepository.findValidCoupon(code);
    if (!coupon) {
      throw new AppError('Invalid or expired coupon', 400);
    }

    if (orderValue < coupon.minOrderValue) {
      throw new AppError(`Minimum order value to use this coupon is ${coupon.minOrderValue}`, 400);
    }

    if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
      throw new AppError('Coupon usage limit reached', 400);
    }

    let discountAmount = 0;
    if (coupon.discountType === 'PERCENTAGE') {
      discountAmount = (orderValue * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      discountAmount = coupon.discountValue;
    }

    return {
      coupon: coupon.code,
      discountAmount,
      finalAmount: orderValue - discountAmount
    };
  }

  async incrementUsage(code: string) {
    const coupon = await this.couponRepository.findValidCoupon(code);
    if (coupon) {
      coupon.usedCount += 1;
      await coupon.save();
    }
  }
}
