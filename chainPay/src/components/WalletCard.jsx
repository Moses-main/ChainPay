import React, { useState } from "react";
import { Wallet, Copy, Check } from "lucide-react";
import { formatAddress } from "../utils/formatters";

const WalletCard = ({ wallet, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    onCopy(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="gradient-primary rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          <span className="text-sm opacity-90">Your Wallet</span>
        </div>
        <div className="px-3 py-1 bg-white/20 rounded-full text-xs backdrop-blur-sm">
          Base Network
        </div>
      </div>

      <div className="mb-4">
        <div className="text-sm opacity-90 mb-1">Balance</div>
        <div className="text-3xl font-bold">
          ${wallet.balance}{" "}
          <span className="text-lg opacity-90">{wallet.currency}</span>
        </div>
      </div>

      <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-xl p-3">
        <div className="flex-1 min-w-0">
          <div className="text-xs opacity-75 mb-1">Address</div>
          <div className="text-sm font-mono truncate">{wallet.address}</div>
        </div>
        <button
          onClick={handleCopy}
          className="ml-3 p-2 hover:bg-white/20 rounded-lg transition-colors"
          title="Copy address"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default WalletCard;
