const express = require("express");
const router = express.Router();
const { validate, schemas } = require("../middleware/validator");
const supabase = require("../config/database");
const { getAgentkit } = require("../config/coinbase");

router.post("/register", validate(schemas.register), async (req, res, next) => {
  try {
    const { userId, phone } = req.body;

    // Check if user exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (existingUser) {
      return res.json({
        success: true,
        message: "User already exists",
        wallet: {
          address: existingUser.wallet_address,
          balance: existingUser.balance || "0.00",
        },
      });
    }

    // Create wallet
    let walletAddress = "";
    const agentkit = getAgentkit();

    if (agentkit) {
      const wallet = await agentkit.wallet;
      walletAddress = wallet.getDefaultAddress().getId();
    } else {
      walletAddress = "0x" + Math.random().toString(16).substr(2, 40);
    }

    // Store user
    const { data: newUser, error } = await supabase
      .from("users")
      .insert([
        {
          user_id: userId,
          phone: phone,
          wallet_address: walletAddress,
          balance: "0.00",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: "User registered successfully",
      wallet: {
        address: walletAddress,
        balance: "0.00",
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
