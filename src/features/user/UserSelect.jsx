export default function UserSelect({
  onSelect,
}) {
  const users = [
    "A",
    "B",
    "C",
    "D",
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Select User</h1>

      {users.map((u) => {
        return (
          <button
            key={u}
            onClick={() =>
              onSelect(u)
            }
            style={{
              marginRight: 12,
            }}
          >
            {u}
          </button>
        );
      })}
    </div>
  );
}