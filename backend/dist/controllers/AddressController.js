"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const AddressService_1 = require("../services/AddressService");
const catchAsync_1 = require("../utils/catchAsync");
const addressService = new AddressService_1.AddressService();
class AddressController {
    getAddresses = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const addresses = await addressService.getUserAddresses(req.user.id);
        res.status(200).json({ success: true, count: addresses.length, data: addresses });
    });
    addAddress = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const address = await addressService.addAddress(req.user.id, req.body);
        res.status(201).json({ success: true, data: address });
    });
    deleteAddress = (0, catchAsync_1.catchAsync)(async (req, res) => {
        await addressService.deleteAddress(req.user.id, req.params.id);
        res.status(200).json({ success: true, data: {} });
    });
}
exports.AddressController = AddressController;
