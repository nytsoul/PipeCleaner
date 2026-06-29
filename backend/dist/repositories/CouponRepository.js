"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Coupon_1 = require("../models/Coupon");
class CouponRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Coupon_1.Coupon);
    }
    async findValidCoupon(code) {
        return this.model.findOne({
            code: code.toUpperCase(),
            isActive: true,
            validFrom: { $lte: new Date() },
            validUntil: { $gte: new Date() }
        });
    }
}
exports.CouponRepository = CouponRepository;
