import { useChatStore } from "./useChatStore";
import { useSocket } from "../../shared/hooks/useSocket";
import ChatWindow from "./ChatWindow";
import ConversationList from "./ConversationList";

export default function ChatShell({ user }) {
  const store = useChatStore();

  const { send } = useSocket(user, (data) => {
    if (data.type === "text") {
      store.addMessage({
        ...data,
        status: "delivered",
      });
    }
  });

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <ConversationList
        store={store}
        user={user}
        setTarget={(peer) => store.setActiveChat(peer)}
      />

      <ChatWindow
        store={store}
        user={user}
        target={store.activeChat}
        send={send}
      />
    </div>
  );
}