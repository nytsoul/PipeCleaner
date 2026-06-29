import { AddressRepository } from '../repositories/AddressRepository';
import { AppError } from '../utils/AppError';

export class AddressService {
  private addressRepository: AddressRepository;

  constructor() {
    this.addressRepository = new AddressRepository();
  }

  async getUserAddresses(userId: string) {
    return this.addressRepository.findByUserId(userId);
  }

  async addAddress(userId: string, addressData: any) {
    if (addressData.isDefault) {
      // Unset other defaults
      const addresses = await this.addressRepository.findByUserId(userId);
      for (const addr of addresses) {
        if (addr.isDefault) {
          addr.isDefault = false;
          await addr.save();
        }
      }
    }
    return this.addressRepository.create({ ...addressData, user: userId });
  }

  async deleteAddress(userId: string, addressId: string) {
    const address = await this.addressRepository.findById(addressId);
    if (!address) {
      throw new AppError('Address not found', 404);
    }
    if (address.user.toString() !== userId) {
      throw new AppError('Not authorized', 401);
    }
    return this.addressRepository.deleteById(addressId);
  }
}
