"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Notification_1 = require("../models/Notification");
class NotificationRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Notification_1.Notification);
    }
    async findByUserId(userId) {
        return this.model.find({ user: userId }).sort('-createdAt');
    }
}
exports.NotificationRepository = NotificationRepository;
