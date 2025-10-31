import logger from '../utils/logger.js';

export const requestLogger = (req, res, next) => {
    const start = Date.now();
    const { method, originalUrl, body, query, params, ip, headers } = req;
    
    // Generate a unique request ID
    const requestId = Math.random().toString(36).substr(2, 9);
    
    // Log the incoming request
    logger.info('Incoming Request', {
        requestId,
        method,
        url: originalUrl,
        ip,
        userAgent: headers['user-agent'],
        query,
        params,
        // Don't log sensitive data in production
        ...(process.env.NODE_ENV !== 'production' && { body })
    });

    // Store the request ID for use in other middleware
    req.requestId = requestId;

    // Capture response finish event
    res.on('finish', () => {
        const duration = Date.now() - start;
        
        logger.info('Request Completed', {
            requestId,
            method,
            url: originalUrl,
            statusCode: res.statusCode,
            duration: `${duration}ms`
        });
    });

    next();
};

export const errorHandler = (err, req, res, next) => {
    const { method, originalUrl, body, query, params, headers } = req;
    
    logger.error('Request Error', {
        requestId: req.requestId,
        method,
        url: originalUrl,
        error: err.message,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
        statusCode: err.statusCode || 500,
        body,
        query,
        params,
        headers: {
            'user-agent': headers['user-agent'],
            'content-type': headers['content-type']
        }
    });

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
        requestId: req.requestId
    });
};
