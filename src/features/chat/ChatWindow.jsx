import { useEffect } from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

export default function ChatWindow({
  store,
  user,
  send,
}) {
  const target = store.activeChat;

  if (!target) {
    return <div>Select user</div>;
  }

  const conversationId = [user, target]
    .sort()
    .join("-");

  const messages =
    store.conversations[conversationId]
      ?.messages || [];

  // READ EVENT
  useEffect(() => {
    messages.forEach((m) => {
      if (
        m.from === target &&
        !m.readAt
      ) {
        send({
          type: "read",
          to: target,
          messageId: m.id,
        });

        store.updateMessage(m.id, {
          readAt: Date.now(),
        });
      }
    });
  }, [messages]);

  return (
    <div style={{ flex: 1 }}>
      <h3>Chat with {target}</h3>

      <MessageList
        messages={messages}
        currentUser={user}
      />

      <ChatInput
        store={store}
        user={user}
        send={send}
      />
    </div>
  );
}