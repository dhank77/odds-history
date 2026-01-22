import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserResponse, JwtPayload } from '../types/auth';
import userRepository from '../database/repositories/userRepository';
import { AppError } from '../middleware/errorHandler';

class AuthService {
  private readonly SALT_ROUNDS = 10;
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
  private readonly JWT_EXPIRATION = '24h';

  async register(email: string, password: string): Promise<{ user: UserResponse; token: string }> {
    // Validate input
    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new AppError('Invalid email format', 400);
    }

    // Validate password length
    if (password.length < 6) {
      throw new AppError('Password must be at least 6 characters', 400);
    }

    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, this.SALT_ROUNDS);

    // Create user
    const user = await userRepository.create(email, passwordHash);

    // Generate token
    const token = this.generateToken(user);

    return {
      user: this.toUserResponse(user),
      token,
    };
  }

  async login(email: string, password: string): Promise<{ user: UserResponse; token: string }> {
    // Validate input
    if (!email || !password) {
      throw new AppError('Email and password are required', 400);
    }

    // Find user
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401);
    }

    // Generate token
    const token = this.generateToken(user);

    return {
      user: this.toUserResponse(user),
      token,
    };
  }

  async getUserById(userId: string): Promise<UserResponse> {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return this.toUserResponse(user);
  }

  generateToken(user: User): string {
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
    };

    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRATION,
    });
  }

  verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as JwtPayload;
    } catch (error) {
      throw new AppError('Invalid or expired token', 401);
    }
  }

  toUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    };
  }
}

export default new AuthService();
