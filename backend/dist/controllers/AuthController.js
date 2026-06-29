"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const catchAsync_1 = require("../utils/catchAsync");
const authService = new AuthService_1.AuthService();
class AuthController {
    register = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const data = await authService.registerUser(req.body);
        res.status(201).json({ success: true, data });
    });
    login = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const data = await authService.loginUser(req.body);
        res.status(200).json({ success: true, data });
    });
}
exports.AuthController = AuthController;
