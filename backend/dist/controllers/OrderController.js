"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const OrderService_1 = require("../services/OrderService");
const catchAsync_1 = require("../utils/catchAsync");
const orderService = new OrderService_1.OrderService();
class OrderController {
    createOrder = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const order = await orderService.createOrder(req.body, req.user.id);
        res.status(201).json({ success: true, data: order });
    });
    getOrder = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const order = await orderService.getOrderById(req.params.id);
        res.status(200).json({ success: true, data: order });
    });
    getMyOrders = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const orders = await orderService.getMyOrders(req.user.id);
        res.status(200).json({ success: true, count: orders.length, data: orders });
    });
    getAllOrders = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const orders = await orderService.getAllOrders();
        res.status(200).json({ success: true, count: orders.length, data: orders });
    });
    updateOrderStatus = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const order = await orderService.updateOrderStatus(req.params.id, req.body.status);
        res.status(200).json({ success: true, data: order });
    });
}
exports.OrderController = OrderController;
