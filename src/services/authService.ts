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
    throw new Error('Not implemented');
  }

  async login(email: string, password: string): Promise<{ user: UserResponse; token: string }> {
    throw new Error('Not implemented');
  }

  async getUserById(userId: string): Promise<UserResponse> {
    throw new Error('Not implemented');
  }

  generateToken(user: User): string {
    throw new Error('Not implemented');
  }

  verifyToken(token: string): JwtPayload {
    throw new Error('Not implemented');
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
