import { Request, Response } from 'express';
import { AddressService } from '../services/AddressService';
import { catchAsync } from '../utils/catchAsync';

const addressService = new AddressService();

export class AddressController {
  public getAddresses = catchAsync(async (req: Request, res: Response) => {
    const addresses = await addressService.getUserAddresses(req.user.id);
    res.status(200).json({ success: true, count: addresses.length, data: addresses });
  });

  public addAddress = catchAsync(async (req: Request, res: Response) => {
    const address = await addressService.addAddress(req.user.id, req.body);
    res.status(201).json({ success: true, data: address });
  });

  public deleteAddress = catchAsync(async (req: Request, res: Response) => {
    await addressService.deleteAddress(req.user.id, req.params.id as string);
    res.status(200).json({ success: true, data: {} });
  });
}
