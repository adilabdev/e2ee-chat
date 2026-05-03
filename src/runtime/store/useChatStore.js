import { useState } from "react";

export function useChatStore() {
  const [conversations, setConversations]
    = useState({});

  const [activeChat, setActiveChat]
    = useState(null);

  const addMessage = (msg) => {
    setConversations((prev) => {
      const existingConversation =
        prev[msg.conversationId] || {
          messagesById: {},

          messageOrder: [],

          lastMessage: "",

          lastMessageAt: 0,
        };

      if (
        existingConversation
          .messagesById[msg.id]
      ) {
        return prev;
      }

      return {
        ...prev,

        [msg.conversationId]: {
          ...existingConversation,

          messagesById: {
            ...existingConversation.messagesById,

            [msg.id]: msg,
          },

          messageOrder: [
            ...existingConversation.messageOrder,
            msg.id,
          ],

          lastMessage: msg.content,

          lastMessageAt:
            Date.now(),
        },
      };
    });
  };

  const updateMessage = (
    conversationId,
    messageId,
    updates
  ) => {
    setConversations((prev) => {
      const conversation =
        prev[conversationId];

      if (!conversation) {
        return prev;
      }

      const oldMessage =
        conversation.messagesById[
          messageId
        ];

      if (!oldMessage) {
        return prev;
      }

      return {
        ...prev,

        [conversationId]: {
          ...conversation,

          messagesById: {
            ...conversation.messagesById,

            [messageId]: {
              ...oldMessage,
              ...updates,
            },
          },
        },
      };
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