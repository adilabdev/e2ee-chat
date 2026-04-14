export default function MessageList({ store, user }) {
  const peer = store.activeChat;

  if (!peer) {
    return (
      <div style={{ padding: 20 }}>
        👈 Select a user to start chat
      </div>
    );
  }

  const messages = store.getMessages(user, peer);

  return (
    <div style={{ padding: 10 }}>
      {messages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        messages.map((m, i) => (
          <div key={i}>
            <b>{m.from}:</b> {m.text}
          </div>
        ))
      )}
    </div>
  );
}