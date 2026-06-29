"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const AddressRepository_1 = require("../repositories/AddressRepository");
const AppError_1 = require("../utils/AppError");
class AddressService {
    addressRepository;
    constructor() {
        this.addressRepository = new AddressRepository_1.AddressRepository();
    }
    async getUserAddresses(userId) {
        return this.addressRepository.findByUserId(userId);
    }
    async addAddress(userId, addressData) {
        if (addressData.isDefault) {
            // Unset other defaults
            const addresses = await this.addressRepository.findByUserId(userId);
            for (const addr of addresses) {
                if (addr.isDefault) {
                    addr.isDefault = false;
                    await addr.save();
                }
            }
        }
        return this.addressRepository.create({ ...addressData, user: userId });
    }
    async deleteAddress(userId, addressId) {
        const address = await this.addressRepository.findById(addressId);
        if (!address) {
            throw new AppError_1.AppError('Address not found', 404);
        }
        if (address.user.toString() !== userId) {
            throw new AppError_1.AppError('Not authorized', 401);
        }
        return this.addressRepository.deleteById(addressId);
    }
}
exports.AddressService = AddressService;
