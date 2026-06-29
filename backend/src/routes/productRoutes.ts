import express from 'express';
import multer from 'multer';
import { ProductController } from '../controllers/ProductController';
import { protect, authorize } from '../middlewares/authMiddleware';

const router = express.Router();
const productController = new ProductController();

const upload = multer({ dest: 'uploads/' });

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

router.use(protect, authorize('admin'));
router.post('/', upload.array('images', 5), productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
