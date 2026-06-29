"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const PaymentService_1 = require("../services/PaymentService");
const catchAsync_1 = require("../utils/catchAsync");
const paymentService = new PaymentService_1.PaymentService();
class PaymentController {
    processPayment = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const payment = await paymentService.processPayment(req.user.id, req.body.orderId, req.body);
        res.status(201).json({ success: true, data: payment });
    });
    getMyPayments = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const payments = await paymentService.getUserPayments(req.user.id);
        res.status(200).json({ success: true, count: payments.length, data: payments });
    });
}
exports.PaymentController = PaymentController;
