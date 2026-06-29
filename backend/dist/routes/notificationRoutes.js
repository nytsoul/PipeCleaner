"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const NotificationController_1 = require("../controllers/NotificationController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const notificationController = new NotificationController_1.NotificationController();
router.use(authMiddleware_1.protect);
router.get('/', notificationController.getMyNotifications);
router.put('/:id/read', notificationController.markAsRead);
exports.default = router;
