import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import config from './src/config/index.js';
import { requestLogger, errorHandler } from './src/middleware/requestLogger.js';
import authRoutes from './src/routes/authRoutes.js';
import logger from './src/utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);

// Trust first proxy
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.cors.allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Request logging
app.use(requestLogger);

// Development logging
if (config.nodeEnv === 'development') {
  app.use(morgan('dev', {
    stream: {
      write: (message) => logger.http(message.trim())
    }
  }));
}

// Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware (must be after all other middleware and routes)
app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

// Log unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', {
    reason,
    stack: reason.stack,
    promise
  });
  // Consider whether to crash the app in production
  if (process.env.NODE_ENV === 'production') {
    // In production, we might want to gracefully shut down
    process.exit(1);
  }
});

// Log uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', {
    error: error.message,
    stack: error.stack
  });
  // Consider whether to crash the app in production
  if (process.env.NODE_ENV === 'production') {
    process.exit(1);
  }
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: 'The requested resource was not found',
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  logger.info(`Server running in ${config.nodeEnv} mode on port ${PORT}`, {
    environment: config.nodeEnv,
    port: PORT,
    timestamp: new Date().toISOString()
  });
  
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
  console.log('Server started successfully');
});

export { app, server };
