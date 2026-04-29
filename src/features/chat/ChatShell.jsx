import { useChatStore } from "./useChatStore";
import { useSocket } from "../../shared/hooks/useSocket";
import ChatWindow from "./ChatWindow";
import ConversationList from "./ConversationList";

export default function ChatShell({ user }) {
  const store = useChatStore();

  const { send } = useSocket(user, (data) => {
    console.log("📡 SOCKET:", data);

    // incoming message
    if (data.type === "text") {
      store.addMessage(data);
    }

    // delivered update
    if (data.type === "delivered") {
      store.updateMessage(data.messageId, {
        deliveredAt: data.deliveredAt
      });
    }

    // read update
    if (data.type === "read") {
      store.updateMessage(data.messageId, {
        readAt: data.readAt
      });
    }
  });

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <ConversationList store={store} user={user} />

      <ChatWindow
        store={store}
        user={user}
        send={send}
      />
    </div>
  );
}