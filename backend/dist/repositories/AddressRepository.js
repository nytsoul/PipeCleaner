"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRepository = void 0;
const BaseRepository_1 = require("./BaseRepository");
const Address_1 = require("../models/Address");
class AddressRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Address_1.Address);
    }
    async findByUserId(userId) {
        return this.model.find({ user: userId });
    }
}
exports.AddressRepository = AddressRepository;
