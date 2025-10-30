import React, { useState } from "react";
import { Wallet, ChevronRight } from "lucide-react";

const AuthScreen = ({ onLogin }) => {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (phone.length < 10) return;
    setLoading(true);
    await onLogin(phone);
    setLoading(false);
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-2xl mb-4 shadow-lg">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            PayAI
          </h1>
          <p className="text-gray-600">Your AI-powered payment assistant</p>
        </div>

        <div className="glass-effect rounded-3xl shadow-xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || phone.length < 10}
              className="w-full gradient-primary text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Continue with Phone
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-6">
            Secured by Privy • Powered by Coinbase 0x402
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
