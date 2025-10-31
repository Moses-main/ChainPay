// Mock Privy integration
import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Wallet,
  MessageCircle,
  User,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";

export const usePrivy = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (phoneNumber) => {
    // Simulate Privy phone auth
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockUser = {
      id: `user_${Math.random().toString(36).substr(2, 9)}`,
      phone: phoneNumber,
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
    setAuthenticated(true);
    return mockUser;
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
  };

  return { authenticated, user, login, logout };
};

// API Service
export const API_URL = "http://localhost:3001/api";

export const api = {
  register: async (userId, phone) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      success: true,
      wallet: {
        address: `0x${Math.random().toString(16).substr(2, 40)}`,
        balance: "0.00",
      },
    };
  },

  getWallet: async (userId) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      success: true,
      wallet: {
        address: `0x${Math.random().toString(16).substr(2, 40)}`,
        balance: "150.00",
        currency: "USDC",
      },
    };
  },

  sendPayment: async (userId, recipient, amount) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return {
      success: true,
      txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
      message: `Successfully sent ${amount} USDC to ${recipient}`,
    };
  },

  chat: async (userId, message) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("balance") || lowerMsg.includes("wallet")) {
      return {
        response:
          "I can see your wallet has 150.00 USDC. Your wallet is ready to send payments anytime! 💰",
        action: "wallet",
        data: { balance: "150.00", currency: "USDC" },
      };
    }

    if (lowerMsg.includes("send") || lowerMsg.includes("pay")) {
      return {
        response:
          "I can help you send USDC payments. Who would you like to send money to? Just provide the wallet address and amount.",
        action: "send",
        data: null,
      };
    }

    if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      return {
        response:
          "Hey there! 👋 I'm your AI financial assistant. I can help you check your wallet balance, send USDC payments, or answer questions about your account. What would you like to do?",
        action: null,
        data: null,
      };
    }

    return {
      response:
        "I'm here to help with your crypto wallet! You can ask me to check your balance, send payments, or view your wallet details. What would you like to do?",
      action: null,
      data: null,
    };
  },
};
