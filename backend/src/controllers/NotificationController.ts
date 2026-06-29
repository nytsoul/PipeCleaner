import { Request, Response } from 'express';
import { NotificationService } from '../services/NotificationService';
import { catchAsync } from '../utils/catchAsync';

const notificationService = new NotificationService();

export class NotificationController {
  public getMyNotifications = catchAsync(async (req: Request, res: Response) => {
    const notifications = await notificationService.getUserNotifications(req.user.id);
    res.status(200).json({ success: true, count: notifications.length, data: notifications });
  });

  public markAsRead = catchAsync(async (req: Request, res: Response) => {
    const notification = await notificationService.markAsRead(req.params.id as string);
    res.status(200).json({ success: true, data: notification });
  });
}
