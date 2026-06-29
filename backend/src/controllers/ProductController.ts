import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';
import { CloudinaryService } from '../services/CloudinaryService';
import { catchAsync } from '../utils/catchAsync';

const productService = new ProductService();
const cloudinaryService = new CloudinaryService();

export class ProductController {
  public getAllProducts = catchAsync(async (req: Request, res: Response) => {
    const products = await productService.getAllProducts(req.query);
    res.status(200).json({ success: true, count: products.length, data: products });
  });

  public getProduct = catchAsync(async (req: Request, res: Response) => {
    const product = await productService.getProductById(req.params.id as string);
    res.status(200).json({ success: true, data: product });
  });

  public createProduct = catchAsync(async (req: Request, res: Response) => {
    let images: string[] = [];
    if (req.files) {
      const files = req.files as Express.Multer.File[];
      for (const file of files) {
        const url = await cloudinaryService.uploadImage(file.path);
        images.push(url);
      }
    }
    const data = { ...req.body, images };
    const product = await productService.createProduct(data);
    res.status(201).json({ success: true, data: product });
  });

  public updateProduct = catchAsync(async (req: Request, res: Response) => {
    const product = await productService.updateProduct(req.params.id as string, req.body);
    res.status(200).json({ success: true, data: product });
  });

  public deleteProduct = catchAsync(async (req: Request, res: Response) => {
    await productService.deleteProduct(req.params.id as string);
    res.status(200).json({ success: true, data: {} });
  });
}
