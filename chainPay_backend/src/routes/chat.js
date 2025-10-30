const express = require("express");
const router = express.Router();
const { validate, schemas } = require("../middleware/validator");
const AIAgent = require("../services/aiAgent");
const supabase = require("../config/database");

const aiAgent = new AIAgent(process.env.OPENAI_API_KEY);

router.post("/", validate(schemas.chat), async (req, res, next) => {
  try {
    const { userId, message } = req.body;

    // Get user context
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Get recent transactions
    const { data: transactions } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    // Process message with AI
    const response = await aiAgent.processMessage(message, {
      userId,
      balance: user.balance,
      walletAddress: user.wallet_address,
      recentTransactions: transactions || [],
    });

    // Store chat history
    await supabase.from("chat_history").insert([
      { user_id: userId, message: message, is_user: true },
      { user_id: userId, message: response.response, is_user: false },
    ]);

    res.json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
