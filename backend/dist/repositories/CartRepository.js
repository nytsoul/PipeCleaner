"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Cart_1 = require("../models/Cart");
class CartRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Cart_1.Cart);
    }
    async findByUserId(userId) {
        return this.model.findOne({ user: userId }).populate('items.product');
    }
}
exports.CartRepository = CartRepository;
