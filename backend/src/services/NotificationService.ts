import { NotificationRepository } from '../repositories/NotificationRepository';

export class NotificationService {
  private notificationRepository: NotificationRepository;

  constructor() {
    this.notificationRepository = new NotificationRepository();
  }

  async getUserNotifications(userId: string) {
    return this.notificationRepository.findByUserId(userId);
  }

  async createNotification(userId: string, title: string, message: string, type: string = 'SYSTEM') {
    return this.notificationRepository.create({
      user: userId,
      title,
      message,
      type
    });
  }

  async markAsRead(notificationId: string) {
    return this.notificationRepository.updateById(notificationId, { isRead: true });
  }
}
