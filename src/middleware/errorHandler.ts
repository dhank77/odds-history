import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof AppError) {
    logger.error('Operational error', {
      message: error.message,
      statusCode: error.statusCode,
      path: req.path,
    });

    res.status(error.statusCode).json({
      success: false,
      error: error.message,
    });
    return;
  }

  // Unexpected errors
  logger.error('Unexpected error', {
    message: error.message,
    stack: error.stack,
    path: req.path,
  });

  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
};

export const notFoundHandler = (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
};
