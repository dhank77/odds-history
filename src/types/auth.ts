// Task 1: Authentication Types

export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserResponse {
  id: string;
  email: string;
  created_at: Date;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: UserResponse;
  token: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}
