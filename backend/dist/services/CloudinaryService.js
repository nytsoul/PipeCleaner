"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const cloudinary_1 = require("cloudinary");
const AppError_1 = require("../utils/AppError");
class CloudinaryService {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async uploadImage(filePath) {
        try {
            const result = await cloudinary_1.v2.uploader.upload(filePath, {
                folder: 'pipebloom',
            });
            return result.secure_url;
        }
        catch (error) {
            throw new AppError_1.AppError('Error uploading image to Cloudinary', 500);
        }
    }
    async deleteImage(publicId) {
        try {
            await cloudinary_1.v2.uploader.destroy(publicId);
        }
        catch (error) {
            throw new AppError_1.AppError('Error deleting image from Cloudinary', 500);
        }
    }
}
exports.CloudinaryService = CloudinaryService;
