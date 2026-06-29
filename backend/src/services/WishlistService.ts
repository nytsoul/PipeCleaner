import { WishlistRepository } from '../repositories/WishlistRepository';
import { AppError } from '../utils/AppError';

export class WishlistService {
  private wishlistRepository: WishlistRepository;

  constructor() {
    this.wishlistRepository = new WishlistRepository();
  }

  async getWishlist(userId: string) {
    let wishlist = await this.wishlistRepository.findByUserId(userId);
    if (!wishlist) {
      wishlist = await this.wishlistRepository.create({ user: userId, products: [] });
    }
    return wishlist;
  }

  async addProduct(userId: string, productId: string) {
    const wishlist = await this.getWishlist(userId);
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }
    return wishlist;
  }

  async removeProduct(userId: string, productId: string) {
    const wishlist = await this.getWishlist(userId);
    wishlist.products = wishlist.products.filter((id: any) => id.toString() !== productId);
    await wishlist.save();
    return wishlist;
  }
}
