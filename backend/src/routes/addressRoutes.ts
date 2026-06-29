import express from 'express';
import { AddressController } from '../controllers/AddressController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();
const addressController = new AddressController();

router.use(protect);

router.get('/', addressController.getAddresses);
router.post('/', addressController.addAddress);
router.delete('/:id', addressController.deleteAddress);

export default router;
