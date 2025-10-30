import React from "react";
import { User, MessageCircle } from "lucide-react";

const ChatMessage = ({ message, isUser }) => {
  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-4 animate-fade-in`}
    >
      <div
        className={`flex gap-3 max-w-[80%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser
              ? "gradient-primary"
              : "bg-gradient-to-br from-gray-100 to-gray-200"
          }`}
        >
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <MessageCircle className="w-4 h-4 text-gray-600" />
          )}
        </div>

        <div>
          <div
            className={`rounded-2xl px-4 py-3 ${
              isUser
                ? "gradient-primary text-white"
                : "glass-effect text-gray-800"
            }`}
          >
            {message.text}
          </div>

          {message.actions && (
            <div className="flex gap-2 mt-2">
              {message.actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.onClick}
                  className="px-4 py-2 glass-effect rounded-xl text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all"
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
