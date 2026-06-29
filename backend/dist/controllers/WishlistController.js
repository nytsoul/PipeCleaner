"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistController = void 0;
const WishlistService_1 = require("../services/WishlistService");
const catchAsync_1 = require("../utils/catchAsync");
const wishlistService = new WishlistService_1.WishlistService();
class WishlistController {
    getWishlist = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const wishlist = await wishlistService.getWishlist(req.user.id);
        res.status(200).json({ success: true, data: wishlist });
    });
    addProduct = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const wishlist = await wishlistService.addProduct(req.user.id, req.body.productId);
        res.status(200).json({ success: true, data: wishlist });
    });
    removeProduct = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const wishlist = await wishlistService.removeProduct(req.user.id, req.params.productId);
        res.status(200).json({ success: true, data: wishlist });
    });
}
exports.WishlistController = WishlistController;
