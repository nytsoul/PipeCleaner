"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const NotificationRepository_1 = require("../repositories/NotificationRepository");
class NotificationService {
    notificationRepository;
    constructor() {
        this.notificationRepository = new NotificationRepository_1.NotificationRepository();
    }
    async getUserNotifications(userId) {
        return this.notificationRepository.findByUserId(userId);
    }
    async createNotification(userId, title, message, type = 'SYSTEM') {
        return this.notificationRepository.create({
            user: userId,
            title,
            message,
            type
        });
    }
    async markAsRead(notificationId) {
        return this.notificationRepository.updateById(notificationId, { isRead: true });
    }
}
exports.NotificationService = NotificationService;
