const express = require("express");
const router = express.Router();
const supabase = require("../config/database");
const { getAgentkit } = require("../config/coinbase");

router.get("/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Get real balance from blockchain if agentkit is available
    let balance = user.balance || "0.00";

    const agentkit = getAgentkit();
    if (agentkit) {
      try {
        const wallet = await agentkit.wallet;
        const balances = await wallet.listBalances();
        const usdcBalance = balances.find((b) => b.asset.symbol === "USDC");
        if (usdcBalance) {
          balance = usdcBalance.amount.toString();
        }
      } catch (err) {
        console.error("Error fetching balance:", err);
      }
    }

    res.json({
      success: true,
      wallet: {
        address: user.wallet_address,
        balance: balance,
        currency: "USDC",
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
