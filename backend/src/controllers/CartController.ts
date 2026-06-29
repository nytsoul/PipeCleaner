import { Request, Response } from 'express';
import { CartService } from '../services/CartService';
import { catchAsync } from '../utils/catchAsync';

const cartService = new CartService();

export class CartController {
  public getCart = catchAsync(async (req: Request, res: Response) => {
    const cart = await cartService.getCart(req.user.id);
    res.status(200).json({ success: true, data: cart });
  });

  public addItem = catchAsync(async (req: Request, res: Response) => {
    const cart = await cartService.addItem(req.user.id, req.body);
    res.status(200).json({ success: true, data: cart });
  });

  public removeItem = catchAsync(async (req: Request, res: Response) => {
    const cart = await cartService.removeItem(req.user.id, req.params.itemId as string);
    res.status(200).json({ success: true, data: cart });
  });

  public clearCart = catchAsync(async (req: Request, res: Response) => {
    const cart = await cartService.clearCart(req.user.id);
    res.status(200).json({ success: true, data: cart });
  });
}
