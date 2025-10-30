import React from "react";
import { MessageCircle } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex gap-3 max-w-[80%]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <MessageCircle className="w-4 h-4 text-gray-600" />
        </div>
        <div className="glass-effect rounded-2xl px-4 py-3">
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
  );
};

export default LoadingSpinner;
