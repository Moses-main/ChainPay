const rateLimit = require("express-rate-limit");
const config = require("../config");

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const strictLimiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 10,
  message: {
    success: false,
    error: "Too many requests, please slow down.",
  },
});

module.exports = {
  limiter,
  strictLimiter,
};
