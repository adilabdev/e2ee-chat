import { useEffect } from "react";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

export default function ChatWindow({ store, user, target, send }) {
  if (!target) return <div>Select user</div>;

  const conversationId = [user, target].sort().join("-");
  const messages = store.conversations[conversationId]?.messages || [];

  // 🔥 READ STATUS
  useEffect(() => {
    messages.forEach((m) => {
      if (m.to === user && m.status !== "read") {
        m.status = "read";
      }
    });
  }, [target]);

  return (
    <div style={{ flex: 1 }}>
      <h3>Chat with {target}</h3>

      <MessageList messages={messages} />

      <ChatInput store={store} user={user} send={send} />
    </div>
  );
}