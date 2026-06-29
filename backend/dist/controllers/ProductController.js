"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductService_1 = require("../services/ProductService");
const CloudinaryService_1 = require("../services/CloudinaryService");
const catchAsync_1 = require("../utils/catchAsync");
const productService = new ProductService_1.ProductService();
const cloudinaryService = new CloudinaryService_1.CloudinaryService();
class ProductController {
    getAllProducts = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const products = await productService.getAllProducts(req.query);
        res.status(200).json({ success: true, count: products.length, data: products });
    });
    getProduct = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json({ success: true, data: product });
    });
    createProduct = (0, catchAsync_1.catchAsync)(async (req, res) => {
        let images = [];
        if (req.files) {
            const files = req.files;
            for (const file of files) {
                const url = await cloudinaryService.uploadImage(file.path);
                images.push(url);
            }
        }
        const data = { ...req.body, images };
        const product = await productService.createProduct(data);
        res.status(201).json({ success: true, data: product });
    });
    updateProduct = (0, catchAsync_1.catchAsync)(async (req, res) => {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json({ success: true, data: product });
    });
    deleteProduct = (0, catchAsync_1.catchAsync)(async (req, res) => {
        await productService.deleteProduct(req.params.id);
        res.status(200).json({ success: true, data: {} });
    });
}
exports.ProductController = ProductController;
