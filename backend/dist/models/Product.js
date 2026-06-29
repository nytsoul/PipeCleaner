"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const variantSchema = new mongoose_1.default.Schema({
    name: String,
    price: Number,
    stock: Number,
    sku: String
});
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name']
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    discountPrice: Number,
    stock: {
        type: Number,
        required: [true, 'Please add stock amount'],
        default: 0
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    images: [String],
    category: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    variants: [variantSchema],
    materials: [String],
    tags: [String],
    isActive: {
        type: Boolean,
        default: true
    },
    averageRating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ isActive: 1 });
exports.Product = mongoose_1.default.model('Product', productSchema);
