import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { catchAsync } from '../utils/catchAsync';

const userService = new UserService();

export class UserController {
  public getMe = catchAsync(async (req: Request, res: Response) => {
    const user = await userService.getUserProfile(req.user.id);
    res.status(200).json({ success: true, data: user });
  });

  public updateMe = catchAsync(async (req: Request, res: Response) => {
    const user = await userService.updateUserProfile(req.user.id, req.body);
    res.status(200).json({ success: true, data: user });
  });

  public getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, count: users.length, data: users });
  });
}
