import { Request, Response } from 'express';
import { WishlistService } from '../services/WishlistService';
import { catchAsync } from '../utils/catchAsync';

const wishlistService = new WishlistService();

export class WishlistController {
  public getWishlist = catchAsync(async (req: Request, res: Response) => {
    const wishlist = await wishlistService.getWishlist(req.user.id);
    res.status(200).json({ success: true, data: wishlist });
  });

  public addProduct = catchAsync(async (req: Request, res: Response) => {
    const wishlist = await wishlistService.addProduct(req.user.id, req.body.productId);
    res.status(200).json({ success: true, data: wishlist });
  });

  public removeProduct = catchAsync(async (req: Request, res: Response) => {
    const wishlist = await wishlistService.removeProduct(req.user.id, req.params.productId as string);
    res.status(200).json({ success: true, data: wishlist });
  });
}
