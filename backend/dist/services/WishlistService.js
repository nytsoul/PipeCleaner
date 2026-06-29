"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const WishlistRepository_1 = require("../repositories/WishlistRepository");
class WishlistService {
    wishlistRepository;
    constructor() {
        this.wishlistRepository = new WishlistRepository_1.WishlistRepository();
    }
    async getWishlist(userId) {
        let wishlist = await this.wishlistRepository.findByUserId(userId);
        if (!wishlist) {
            wishlist = await this.wishlistRepository.create({ user: userId, products: [] });
        }
        return wishlist;
    }
    async addProduct(userId, productId) {
        const wishlist = await this.getWishlist(userId);
        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
        }
        return wishlist;
    }
    async removeProduct(userId, productId) {
        const wishlist = await this.getWishlist(userId);
        wishlist.products = wishlist.products.filter((id) => id.toString() !== productId);
        await wishlist.save();
        return wishlist;
    }
}
exports.WishlistService = WishlistService;
