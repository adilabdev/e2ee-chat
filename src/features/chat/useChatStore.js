import { useState } from "react";

export function useChatStore() {
  const [conversations, setConversations] = useState({});
  const [activeChat, setActiveChat] = useState(null);

  const addMessage = (msg) => {
    const id = msg.conversationId;

    setConversations((prev) => {
      const existing = prev[id] || {
        messages: [],
        lastMessageAt: 0,
        lastMessage: "",
      };

      // 🔥 DUPLICATE FIX
      if (existing.messages.find((m) => m.id === msg.id)) {
        return prev;
      }

      return {
        ...prev,
        [id]: {
          messages: [...existing.messages, msg],
          lastMessageAt: msg.timestamp,
          lastMessage: msg.content,
        },
      };
    });
  };

  return {
    conversations,
    activeChat,
    setActiveChat,
    addMessage,
  };
}