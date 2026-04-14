export default function ConversationList({ store, user }) {
  const users = ["A", "B", "C", "D"];

  const startChat = (peer) => {
    store.setActiveChat(peer);
  };

  return (
    <div style={{ width: 200, borderRight: "1px solid #ddd", padding: 10 }}>
      <h4>Users</h4>

      {users
        .filter((u) => u !== user)
        .map((u) => (
          <div
            key={u}
            style={{
              cursor: "pointer",
              padding: 6,
              background: store.activeChat === u ? "#eee" : "transparent",
            }}
            onClick={() => startChat(u)}
          >
            👤 {u}
          </div>
        ))}

      <hr />

      <h4>Chats</h4>

      {Object.keys(store.conversations).length === 0 && (
        <p style={{ fontSize: 12 }}>No chats yet</p>
      )}

      {Object.keys(store.conversations).map((id) => {
        const [a, b] = id.split("-");
        const peer = a === user ? b : a;

        return (
          <div
            key={id}
            onClick={() => store.setActiveChat(peer)}
            style={{ cursor: "pointer", padding: 5 }}
          >
            💬 {peer}
          </div>
        );
      })}
    </div>
  );
}