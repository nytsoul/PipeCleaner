import { Request, Response } from 'express';
import { PaymentService } from '../services/PaymentService';
import { catchAsync } from '../utils/catchAsync';

const paymentService = new PaymentService();

export class PaymentController {
  public processPayment = catchAsync(async (req: Request, res: Response) => {
    const payment = await paymentService.processPayment(req.user.id, req.body.orderId, req.body);
    res.status(201).json({ success: true, data: payment });
  });

  public getMyPayments = catchAsync(async (req: Request, res: Response) => {
    const payments = await paymentService.getUserPayments(req.user.id);
    res.status(200).json({ success: true, count: payments.length, data: payments });
  });
}
