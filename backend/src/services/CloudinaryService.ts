import { v2 as cloudinary } from 'cloudinary';
import { AppError } from '../utils/AppError';

export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(filePath: string) {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'pipebloom',
      });
      return result.secure_url;
    } catch (error) {
      throw new AppError('Error uploading image to Cloudinary', 500);
    }
  }

  async deleteImage(publicId: string) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new AppError('Error deleting image from Cloudinary', 500);
    }
  }
}
