"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const CartService_1 = require("../services/CartService");
const catchAsync_1 = require("../utils/catchAsync");
const cartService = new CartService_1.CartService();
class CartController {
    getCart = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const cart = await cartService.getCart(req.user.id);
        res.status(200).json({ success: true, data: cart });
    });
    addItem = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const cart = await cartService.addItem(req.user.id, req.body);
        res.status(200).json({ success: true, data: cart });
    });
    removeItem = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const cart = await cartService.removeItem(req.user.id, req.params.itemId);
        res.status(200).json({ success: true, data: cart });
    });
    clearCart = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const cart = await cartService.clearCart(req.user.id);
        res.status(200).json({ success: true, data: cart });
    });
}
exports.CartController = CartController;
