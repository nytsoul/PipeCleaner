"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponController = void 0;
const CouponService_1 = require("../services/CouponService");
const catchAsync_1 = require("../utils/catchAsync");
const couponService = new CouponService_1.CouponService();
class CouponController {
    createCoupon = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const coupon = await couponService.createCoupon(req.body);
        res.status(201).json({ success: true, data: coupon });
    });
    validateCoupon = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const { code, orderValue } = req.body;
        const result = await couponService.validateCoupon(code, orderValue);
        res.status(200).json({ success: true, data: result });
    });
}
exports.CouponController = CouponController;
