import { Router } from 'express';
import { body } from 'express-validator';
import { sendOtp, verifyOtp } from '../controllers/authController.js';

const router = Router();

router.post(
    '/send-otp',
    [
        body('phoneNumber')
            .notEmpty()
            .withMessage('Phone number is required')
            .isMobilePhone()
            .withMessage('Please provide a valid phone number')
    ],
    sendOtp
);

router.post(
    '/verify-otp',
    [
        body('verificationId').notEmpty().withMessage('Verification ID is required'),
        body('code').notEmpty().withMessage('Verification code is required'),
        body('phoneNumber')
            .notEmpty()
            .withMessage('Phone number is required')
            .isMobilePhone()
            .withMessage('Please provide a valid phone number')
    ],
    verifyOtp
);

export default router;
