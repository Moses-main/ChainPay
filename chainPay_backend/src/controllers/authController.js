import { auth } from '../config/firebase.js';
import { StatusCodes } from 'http-status-codes';
import { validationResult } from 'express-validator';

export const sendOtp = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }

        const { phoneNumber } = req.body;
        // Implementation for sending OTP
        res.status(StatusCodes.OK).json({ message: 'OTP sent successfully' });
    } catch (error) {
        next(error);
    }
};

export const verifyOtp = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
        }

        const { verificationId, code, phoneNumber } = req.body;
        // Implementation for verifying OTP
        res.status(StatusCodes.OK).json({ 
            message: 'OTP verified successfully',
            token: 'your-jwt-token'
        });
    } catch (error) {
        next(error);
    }
};
