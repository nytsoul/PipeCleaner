"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponService = void 0;
const CouponRepository_1 = require("../repositories/CouponRepository");
const AppError_1 = require("../utils/AppError");
class CouponService {
    couponRepository;
    constructor() {
        this.couponRepository = new CouponRepository_1.CouponRepository();
    }
    async createCoupon(data) {
        return this.couponRepository.create(data);
    }
    async validateCoupon(code, orderValue) {
        const coupon = await this.couponRepository.findValidCoupon(code);
        if (!coupon) {
            throw new AppError_1.AppError('Invalid or expired coupon', 400);
        }
        if (orderValue < coupon.minOrderValue) {
            throw new AppError_1.AppError(`Minimum order value to use this coupon is ${coupon.minOrderValue}`, 400);
        }
        if (coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
            throw new AppError_1.AppError('Coupon usage limit reached', 400);
        }
        let discountAmount = 0;
        if (coupon.discountType === 'PERCENTAGE') {
            discountAmount = (orderValue * coupon.discountValue) / 100;
            if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
                discountAmount = coupon.maxDiscount;
            }
        }
        else {
            discountAmount = coupon.discountValue;
        }
        return {
            coupon: coupon.code,
            discountAmount,
            finalAmount: orderValue - discountAmount
        };
    }
    async incrementUsage(code) {
        const coupon = await this.couponRepository.findValidCoupon(code);
        if (coupon) {
            coupon.usedCount += 1;
            await coupon.save();
        }
    }
}
exports.CouponService = CouponService;
