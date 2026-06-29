"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const userController = new UserController_1.UserController();
router.use(authMiddleware_1.protect);
router.get('/me', userController.getMe);
router.put('/me', userController.updateMe);
router.use((0, authMiddleware_1.authorize)('admin'));
router.get('/', userController.getAllUsers);
exports.default = router;
