"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Wishlist_1 = require("../models/Wishlist");
class WishlistRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Wishlist_1.Wishlist);
    }
    async findByUserId(userId) {
        return this.model.findOne({ user: userId }).populate('products');
    }
}
exports.WishlistRepository = WishlistRepository;
