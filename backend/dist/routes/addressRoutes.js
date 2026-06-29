"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AddressController_1 = require("../controllers/AddressController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
const addressController = new AddressController_1.AddressController();
router.use(authMiddleware_1.protect);
router.get('/', addressController.getAddresses);
router.post('/', addressController.addAddress);
router.delete('/:id', addressController.deleteAddress);
exports.default = router;
