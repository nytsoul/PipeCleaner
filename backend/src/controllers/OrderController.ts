import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';
import { catchAsync } from '../utils/catchAsync';

const orderService = new OrderService();

export class OrderController {
  public createOrder = catchAsync(async (req: Request, res: Response) => {
    const order = await orderService.createOrder(req.body, req.user.id);
    res.status(201).json({ success: true, data: order });
  });

  public getOrder = catchAsync(async (req: Request, res: Response) => {
    const order = await orderService.getOrderById(req.params.id as string);
    res.status(200).json({ success: true, data: order });
  });

  public getMyOrders = catchAsync(async (req: Request, res: Response) => {
    const orders = await orderService.getMyOrders(req.user.id);
    res.status(200).json({ success: true, count: orders.length, data: orders });
  });

  public getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ success: true, count: orders.length, data: orders });
  });

  public updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
    const order = await orderService.updateOrderStatus(req.params.id as string, req.body.status);
    res.status(200).json({ success: true, data: order });
  });
}
