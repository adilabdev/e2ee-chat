import { useState } from "react";

export function useChatStore() {
  const [conversations, setConversations] = useState({});
  const [activeChat, setActiveChat] = useState(null);

  const addMessage = (msg) => {
    setConversations((prev) => {
      const old = prev[msg.conversationId] || {
        messages: [],
        lastMessageAt: 0,
      };

      const exists = old.messages.find(
        (m) => m.id === msg.id
      );

      if (exists) return prev;

      return {
        ...prev,

        [msg.conversationId]: {
          messages: [...old.messages, msg],
          lastMessageAt: Date.now(),
        },
      };
    });
  };

  const updateMessage = (messageId, updates) => {
    setConversations((prev) => {
      const copy = { ...prev };

      Object.values(copy).forEach((conv) => {
        conv.messages = conv.messages.map((m) =>
          m.id === messageId
            ? { ...m, ...updates }
            : m
        );
      });

      return copy;
    });
  };

  return {
    conversations,
    activeChat,
    setActiveChat,
    addMessage,
    updateMessage,
  };
}