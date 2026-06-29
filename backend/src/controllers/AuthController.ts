import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { catchAsync } from '../utils/catchAsync';

const authService = new AuthService();

export class AuthController {
  public register = catchAsync(async (req: Request, res: Response) => {
    const data = await authService.registerUser(req.body);
    res.status(201).json({ success: true, data });
  });

  public login = catchAsync(async (req: Request, res: Response) => {
    const data = await authService.loginUser(req.body);
    res.status(200).json({ success: true, data });
  });
}
