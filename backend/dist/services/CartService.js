"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const CartRepository_1 = require("../repositories/CartRepository");
const ProductRepository_1 = require("../repositories/ProductRepository");
const AppError_1 = require("../utils/AppError");
class CartService {
    cartRepository;
    productRepository;
    constructor() {
        this.cartRepository = new CartRepository_1.CartRepository();
        this.productRepository = new ProductRepository_1.ProductRepository();
    }
    async getCart(userId) {
        let cart = await this.cartRepository.findByUserId(userId);
        if (!cart) {
            cart = await this.cartRepository.create({ user: userId, items: [], totalPrice: 0 });
        }
        return cart;
    }
    async addItem(userId, itemData) {
        const product = await this.productRepository.findById(itemData.productId);
        if (!product) {
            throw new AppError_1.AppError('Product not found', 404);
        }
        const cart = await this.getCart(userId);
        // Check if item exists in cart
        const itemIndex = cart.items.findIndex((item) => item.product._id.toString() === itemData.productId && item.variant === itemData.variant);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += itemData.quantity;
        }
        else {
            cart.items.push({
                product: product._id,
                quantity: itemData.quantity,
                price: product.price,
                variant: itemData.variant
            });
        }
        cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        await cart.save();
        return cart;
    }
    async removeItem(userId, itemId) {
        const cart = await this.getCart(userId);
        cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
        cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        await cart.save();
        return cart;
    }
    async clearCart(userId) {
        const cart = await this.getCart(userId);
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();
        return cart;
    }
}
exports.CartService = CartService;
