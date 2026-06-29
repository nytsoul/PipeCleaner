"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categorySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please add a category name'],
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    image: String
}, {
    timestamps: true
});
exports.Category = mongoose_1.default.model('Category', categorySchema);
