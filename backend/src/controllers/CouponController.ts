import { Request, Response } from 'express';
import { CouponService } from '../services/CouponService';
import { catchAsync } from '../utils/catchAsync';

const couponService = new CouponService();

export class CouponController {
  public createCoupon = catchAsync(async (req: Request, res: Response) => {
    const coupon = await couponService.createCoupon(req.body);
    res.status(201).json({ success: true, data: coupon });
  });

  public validateCoupon = catchAsync(async (req: Request, res: Response) => {
    const { code, orderValue } = req.body;
    const result = await couponService.validateCoupon(code, orderValue);
    res.status(200).json({ success: true, data: result });
  });
}
