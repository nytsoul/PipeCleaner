"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRepository_1 = require("../repositories/UserRepository");
const AppError_1 = require("../utils/AppError");
class AuthService {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    async registerUser(userData) {
        const { name, email, password } = userData;
        const userExists = await this.userRepository.findOne({ email });
        if (userExists) {
            throw new AppError_1.AppError('User already exists', 400);
        }
        const user = await this.userRepository.create({ name, email, password });
        return this.generateTokenResponse(user);
    }
    async loginUser(userData) {
        const { email, password } = userData;
        if (!email || !password) {
            throw new AppError_1.AppError('Please provide email and password', 400);
        }
        const user = await this.userRepository.findByEmailWithPassword(email);
        if (!user) {
            throw new AppError_1.AppError('Invalid credentials', 401);
        }
        const isMatch = await require('bcryptjs').compare(password, user.password);
        if (!isMatch) {
            throw new AppError_1.AppError('Invalid credentials', 401);
        }
        return this.generateTokenResponse(user);
    }
    generateTokenResponse(user) {
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token
        };
    }
}
exports.AuthService = AuthService;
