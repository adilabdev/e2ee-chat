import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function ChatWindow({ store, user, send }) {
  return (
    <div style={{ flex: 1, padding: 10 }}>
      <h3>Logged in as: {user}</h3>

      <MessageList store={store} user={user} />

      <ChatInput store={store} user={user} send={send} />
    </div>
  );
}