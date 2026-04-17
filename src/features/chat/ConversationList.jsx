export default function ConversationList({ store, user, setTarget }) {
  const users = ["A", "B", "C", "D"].filter(u => u !== user);

  return (
    <div style={{ width: 200 }}>
      <h4>Users</h4>

      {users.map((u) => (
        <div key={u} onClick={() => {
          store.setActiveChat(u);
          setTarget(u);
        }}>
          👤 {u}
        </div>
      ))}

      <hr />

      <h4>Chats</h4>

      {Object.keys(store.conversations).length === 0 && (
        <p>No chats yet</p>
      )}

      {Object.entries(store.conversations)
        .sort((a, b) => b[1].lastMessageAt - a[1].lastMessageAt)
        .map(([id, conv]) => {
          const [a, b] = id.split("-");
          const peer = a === user ? b : a;

          return (
            <div key={id} onClick={() => {
              store.setActiveChat(peer);
              setTarget(peer);
            }}>
              💬 {peer} - {conv.lastMessage}
            </div>
          );
        })}
    </div>
  );
}