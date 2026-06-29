"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const ProductRepository_1 = require("../repositories/ProductRepository");
const AppError_1 = require("../utils/AppError");
class ProductService {
    productRepository;
    constructor() {
        this.productRepository = new ProductRepository_1.ProductRepository();
    }
    async getAllProducts(query) {
        // Pagination and Filtering logic could go here
        return this.productRepository.findActive();
    }
    async getProductById(id) {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new AppError_1.AppError('Product not found', 404);
        }
        return product;
    }
    async createProduct(data) {
        return this.productRepository.create(data);
    }
    async updateProduct(id, data) {
        const product = await this.productRepository.updateById(id, data);
        if (!product) {
            throw new AppError_1.AppError('Product not found', 404);
        }
        return product;
    }
    async deleteProduct(id) {
        const product = await this.productRepository.deleteById(id);
        if (!product) {
            throw new AppError_1.AppError('Product not found', 404);
        }
        return product;
    }
}
exports.ProductService = ProductService;
