import { CartRepository } from '../repositories/CartRepository';
import { ProductRepository } from '../repositories/ProductRepository';
import { AppError } from '../utils/AppError';

export class CartService {
  private cartRepository: CartRepository;
  private productRepository: ProductRepository;

  constructor() {
    this.cartRepository = new CartRepository();
    this.productRepository = new ProductRepository();
  }

  async getCart(userId: string) {
    let cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      cart = await this.cartRepository.create({ user: userId, items: [], totalPrice: 0 });
    }
    return cart;
  }

  async addItem(userId: string, itemData: { productId: string; quantity: number; variant?: string }) {
    const product = await this.productRepository.findById(itemData.productId);
    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const cart = await this.getCart(userId);
    
    // Check if item exists in cart
    const itemIndex = cart.items.findIndex(
      (item: any) => item.product._id.toString() === itemData.productId && item.variant === itemData.variant
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += itemData.quantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity: itemData.quantity,
        price: product.price,
        variant: itemData.variant
      });
    }

    cart.totalPrice = cart.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
    await cart.save();
    return cart;
  }

  async removeItem(userId: string, itemId: string) {
    const cart = await this.getCart(userId);
    cart.items = cart.items.filter((item: any) => item._id.toString() !== itemId);
    cart.totalPrice = cart.items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
    await cart.save();
    return cart;
  }

  async clearCart(userId: string) {
    const cart = await this.getCart(userId);
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    return cart;
  }
}
