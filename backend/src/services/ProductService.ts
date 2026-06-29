import { ProductRepository } from '../repositories/ProductRepository';
import { AppError } from '../utils/AppError';

export class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async getAllProducts(query: any) {
    // Pagination and Filtering logic could go here
    return this.productRepository.findActive();
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }

  async createProduct(data: any) {
    return this.productRepository.create(data);
  }

  async updateProduct(id: string, data: any) {
    const product = await this.productRepository.updateById(id, data);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.deleteById(id);
    if (!product) {
      throw new AppError('Product not found', 404);
    }
    return product;
  }
}
