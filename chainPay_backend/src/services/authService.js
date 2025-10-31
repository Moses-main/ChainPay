const { auth } = require('../config/firebase');
const admin = require('firebase-admin');

class AuthService {
  /**
   * Send OTP to the provided phone number
   * @param {string} phoneNumber - User's phone number
   * @returns {Promise<Object>} - Verification ID
   */
  static async sendOTP(phoneNumber) {
    try {
      // Format phone number to E.164 format (e.g., +1234567890)
      const formattedPhoneNumber = phoneNumber.startsWith('+') 
        ? phoneNumber 
        : `+${phoneNumber}`;

      // In a real implementation, you would implement reCAPTCHA verification here
      // This is a mock implementation - in production, use Firebase Client SDK
      const verificationId = `mock-verification-id-${Date.now()}`;
      
      // In a real implementation, this would send an actual SMS via Firebase
      console.log(`OTP sent to ${formattedPhoneNumber}`);
      
      return { 
        success: true, 
        verificationId,
        message: 'Verification code sent successfully',
        // In production, you would get this from Firebase Client SDK
        // verificationId: verificationId
      };
    } catch (error) {
      console.error('Error in sendOTP:', error);
      throw new Error('Failed to send verification code');
    }
  }

  /**
   * Verify the OTP and sign in the user
   * @param {string} verificationId - Verification ID from sendOTP
   * @param {string} code - OTP code
   * @param {string} phoneNumber - User's phone number
   * @returns {Promise<Object>} - User data and token
   */
  static async verifyOTP(verificationId, code, phoneNumber) {
    try {
      // In a real implementation, you would verify the code with Firebase Client SDK
      // This is a mock implementation
      
      // Format phone number
      const formattedPhoneNumber = phoneNumber.startsWith('+') 
        ? phoneNumber 
        : `+${phoneNumber}`;

      // Check if user exists or create a new one
      let userRecord;
      try {
        userRecord = await auth.getUserByPhoneNumber(formattedPhoneNumber);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          // Create new user if not exists
          userRecord = await auth.createUser({
            phoneNumber: formattedPhoneNumber
          });
        } else {
          throw error;
        }
      }

      // Generate a custom token for the user
      const token = await auth.createCustomToken(userRecord.uid);
      
      return {
        success: true,
        token,
        user: {
          uid: userRecord.uid,
          phoneNumber: userRecord.phoneNumber
        }
      };
    } catch (error) {
      console.error('Error in verifyOTP:', error);
      throw new Error(error.message || 'Failed to verify OTP');
    }
  }

  /**
   * Verify Firebase ID token
   * @param {string} token - Firebase ID token
   * @returns {Promise<Object>} - Decoded token
   */
  static async verifyToken(token) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new Error('Invalid or expired token');
    }
  }

  /**
   * Get user by UID
   * @param {string} uid - User ID
   * @returns {Promise<Object>} - User record
   */
  static async getUser(uid) {
    try {
      return await auth.getUser(uid);
    } catch (error) {
      console.error('Error getting user:', error);
      throw new Error('User not found');
    }
  }
}

module.exports = AuthService;
