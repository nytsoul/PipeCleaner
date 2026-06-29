import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { AppError } from '../utils/AppError';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser(userData: any) {
    const { name, email, password } = userData;

    const userExists = await this.userRepository.findOne({ email });
    if (userExists) {
      throw new AppError('User already exists', 400);
    }

    const user = await this.userRepository.create({ name, email, password });
    return this.generateTokenResponse(user);
  }

  async loginUser(userData: any) {
    const { email, password } = userData;

    if (!email || !password) {
      throw new AppError('Please provide email and password', 400);
    }

    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isMatch = await require('bcryptjs').compare(password, user.password);

    if (!isMatch) {
      throw new AppError('Invalid credentials', 401);
    }

    return this.generateTokenResponse(user);
  }

  private generateTokenResponse(user: any) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN as any
    });

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    };
  }
}
