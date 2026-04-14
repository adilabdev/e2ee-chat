import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";

export default function ChatShell({ user, send }) {
  const store = user.store;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ConversationList store={store} user={user.id} />
      <ChatWindow store={store} user={user.id} send={send} />
    </div>
  );
}