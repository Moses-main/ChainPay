const { CdpAgentkit } = require("@coinbase/cdp-agentkit-core");
require("dotenv").config();

let agentkit = null;

const initializeAgentkit = async () => {
  try {
    const config = {
      cdpApiKeyName: process.env.CDP_API_KEY_NAME,
      cdpApiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY.replace(
        /\\n/g,
        "\n"
      ),
      networkId: process.env.NETWORK_ID || "base-sepolia",
    };

    agentkit = await CdpAgentkit.configureWithWallet(config);
    console.log("✅ Coinbase AgentKit initialized successfully");
    return agentkit;
  } catch (error) {
    console.error("❌ Failed to initialize Agentkit:", error.message);
    return null;
  }
};

const getAgentkit = () => agentkit;

module.exports = {
  initializeAgentkit,
  getAgentkit,
};
