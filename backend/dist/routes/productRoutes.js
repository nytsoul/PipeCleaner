"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const ProductController_1 = require("../controllers/ProductController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const productController = new ProductController_1.ProductController();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);
router.use(authMiddleware_1.protect, (0, authMiddleware_1.authorize)('admin'));
router.post('/', upload.array('images', 5), productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
exports.default = router;
