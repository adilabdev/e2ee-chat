export default function ConversationList({
  user,
  store,
}) {
  const users =
    ["A", "B", "C", "D"]
      .filter((u) => u !== user);

  return (
    <div style={{ width: 240 }}>
      <h2>Users</h2>

      {users.map((u) => {
        return (
          <div
            key={u}
            onClick={() =>
              store.setActiveChat(u)
            }
            style={{
              marginBottom: 12,
              cursor: "pointer",
            }}
          >
            👤 {u}
          </div>
        );
      })}

      <hr />

      <h2>Chats</h2>

      {Object.entries(
        store.conversations
      )
        .sort(
          (a, b) =>
            b[1].lastMessageAt -
            a[1].lastMessageAt
        )
        .map(([id, conv]) => {
          const [a, b] =
            id.split("-");

          const peer =
            a === user ? b : a;

          return (
            <div
              key={id}
              onClick={() =>
                store.setActiveChat(
                  peer
                )
              }
              style={{
                marginBottom: 12,
                cursor: "pointer",
              }}
            >
              💬 {peer} -
              {" "}
              {conv.lastMessage}
            </div>
          );
        })}
    </div>
  );
}