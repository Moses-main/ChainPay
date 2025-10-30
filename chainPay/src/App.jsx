import { useState, useRef, useEffect } from "react";
import { usePrivy } from "./hooks/userPrivy";

import AuthScreen from "./components/AuthScreen";
import ChatMessage from "./components/ChatMessage";
import WalletCard from "./components/WalletCard";
import { Wallet, Send, MessageCircle } from "lucide-react";
import { api } from "./hooks/userPrivy";
import "./App.css";

// Main App Component
const App = () => {
  const { authenticated, user, login, logout } = usePrivy();
  const [wallet, setWallet] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (authenticated && user) {
      initializeUser();
    }
  }, [authenticated, user]);

  const initializeUser = async () => {
    const result = await api.register(user.id, user.phone);
    if (result.success) {
      const walletData = await api.getWallet(user.id);
      setWallet(walletData.wallet);

      setMessages([
        {
          id: Date.now(),
          text: `Welcome! 👋 I've set up your wallet and you're ready to go. You have ${walletData.wallet.balance} USDC available. How can I help you today?`,
          isUser: false,
          actions: [
            {
              label: "💰 Check Balance",
              onClick: () => handleQuickAction("balance"),
            },
            {
              label: "💸 Send Money",
              onClick: () => handleQuickAction("send"),
            },
          ],
        },
      ]);
    }
  };

  const handleQuickAction = async (action) => {
    const actionMessages = {
      balance: "Show me my wallet balance",
      send: "I want to send money",
    };

    const userMsg = actionMessages[action];
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: userMsg,
        isUser: true,
      },
    ]);

    setLoading(true);
    const response = await api.chat(user.id, userMsg);
    setLoading(false);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        text: response.response,
        isUser: false,
      },
    ]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: userMessage,
        isUser: true,
      },
    ]);

    setLoading(true);
    const response = await api.chat(user.id, userMessage);
    setLoading(false);

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        text: response.response,
        isUser: false,
        actions:
          response.action === "wallet"
            ? [
                {
                  label: "💸 Send Money",
                  onClick: () => handleQuickAction("send"),
                },
              ]
            : response.action === "send"
              ? [
                  {
                    label: "📋 View Wallet",
                    onClick: () => handleQuickAction("balance"),
                  },
                ]
              : null,
      },
    ]);
  };

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
  };

  if (!authenticated) {
    return <AuthScreen onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900">PayAI</h1>
              <p className="text-xs text-gray-500">{user.phone}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 pb-24">
        {/* Wallet Card */}
        {wallet && (
          <div className="mb-6">
            <WalletCard wallet={wallet} onCopy={handleCopyAddress} />
          </div>
        )}

        {/* Chat Messages */}
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isUser={message.isUser}
            />
          ))}

          {loading && (
            <div className="flex justify-start mb-4">
              <div className="flex gap-3 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-gray-600" />
                </div>
                <div className="bg-white/70 backdrop-blur-sm border border-gray-100 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-xl border-t border-gray-200/50 p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about your wallet..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
