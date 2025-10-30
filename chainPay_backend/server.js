const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("./src/config");
const { initializeAgentkit } = require("./src/config/coinbase");
const { errorHandler, notFound } = require("./src/middleware/errorHandler");
const { limiter } = require("./src/middleware/rateLimiter");
const logger = require("./src/utils/logger");

// Routes
const authRoutes = require("./src/routes/auth");
const walletRoutes = require("./src/routes/wallet");
const transactionRoutes = require("./src/routes/transaction");
const chatRoutes = require("./src/routes/chat");

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: config.cors.allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use("/api/", limiter);

// Routes
app.use("/api/register", authRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api", transactionRoutes);
app.use("/api/chat", chatRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Initialize Coinbase AgentKit and start server
const startServer = async () => {
  try {
    await initializeAgentkit();

    app.listen(config.port, () => {
      logger.info(`🚀 Server running on http://localhost:${config.port}`);
      logger.info(`📝 Environment: ${config.nodeEnv}`);
      logger.info(`🔗 CORS allowed: ${config.cors.allowedOrigins.join(", ")}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
