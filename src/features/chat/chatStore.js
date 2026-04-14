import { useState } from "react";

export function useChatStore() {
  const [activeUser, setActiveUser] = useState(null);
  const [activeChat, setActiveChat] = useState(null);

  const [conversations, setConversations] = useState({});

  const getId = (a, b) => [a, b].sort().join("-");

  const addMessage = (msg) => {
  const id = [msg.from, msg.to].sort().join("-");

  setConversations((prev) => ({
    ...prev,
    [id]: [...(prev[id] || []), msg],
  }));

  // 🔥 AUTO CHAT OPEN
  setActiveChat(msg.to === activeUser ? msg.from : msg.to);
};

  const getMessages = (user, peer) => {
    if (!user || !peer) return [];
    return conversations[getId(user, peer)] || [];
  };

  return {
    activeUser,
    setActiveUser,

    activeChat,
    setActiveChat,

    conversations,
    addMessage,
    getMessages,
  };
}