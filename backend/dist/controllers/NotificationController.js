"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const NotificationService_1 = require("../services/NotificationService");
const catchAsync_1 = require("../utils/catchAsync");
const notificationService = new NotificationService_1.NotificationService();
class NotificationController {
    getMyNotifications = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const notifications = await notificationService.getUserNotifications(req.user.id);
        res.status(200).json({ success: true, count: notifications.length, data: notifications });
    });
    markAsRead = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const notification = await notificationService.markAsRead(req.params.id);
        res.status(200).json({ success: true, data: notification });
    });
}
exports.NotificationController = NotificationController;
