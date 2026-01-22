import express, { Application } from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import Database from './database/connection';
import logger from './utils/logger';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Routes
app.use('/api', routes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Graceful shutdown
const gracefulShutdown = async () => {
  logger.info('Received shutdown signal, closing gracefully...');

  try {
    await Database.closeConnection();
    logger.info('Database connection closed');
    process.exit(0);
  } catch (error) {
    logger.error('Error during shutdown', { error });
    process.exit(1);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Start server
const startServer = async () => {
  try {
    // Test database connection
    const dbConnected = await Database.testConnection();

    if (!dbConnected) {
      logger.error('Failed to connect to database');
      process.exit(1);
    }

    logger.info('Database connection established');

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
      logger.info(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
};

startServer();

export default app;
