import { StatusCodes } from 'http-status-codes';

export default (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === 'ValidationError') {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: 'Validation Error',
            details: err.message
        });
    }

    if (err.code === 'auth/invalid-phone-number') {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            error: 'Invalid phone number format'
        });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
};
