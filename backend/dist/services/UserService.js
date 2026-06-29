"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const AppError_1 = require("../utils/AppError");
class UserService {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    async getUserProfile(userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new AppError_1.AppError('User not found', 404);
        }
        return user;
    }
    async updateUserProfile(userId, data) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new AppError_1.AppError('User not found', 404);
        }
        if (data.name)
            user.name = data.name;
        if (data.email)
            user.email = data.email;
        if (data.password)
            user.password = data.password;
        await user.save();
        return user;
    }
    async getAllUsers() {
        return this.userRepository.find();
    }
}
exports.UserService = UserService;
