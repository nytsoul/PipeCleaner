"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Payment_1 = require("../models/Payment");
class PaymentRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Payment_1.Payment);
    }
    async findByUserId(userId) {
        return this.model.find({ user: userId }).sort('-createdAt');
    }
}
exports.PaymentRepository = PaymentRepository;
