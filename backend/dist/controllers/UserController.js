"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
const catchAsync_1 = require("../utils/catchAsync");
const userService = new UserService_1.UserService();
class UserController {
    getMe = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const user = await userService.getUserProfile(req.user.id);
        res.status(200).json({ success: true, data: user });
    });
    updateMe = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const user = await userService.updateUserProfile(req.user.id, req.body);
        res.status(200).json({ success: true, data: user });
    });
    getAllUsers = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const users = await userService.getAllUsers();
        res.status(200).json({ success: true, count: users.length, data: users });
    });
}
exports.UserController = UserController;
