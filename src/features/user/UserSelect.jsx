export default function UserSelect({ onSelect }) {
  const users = ["A", "B", "C", "D"];

  return (
    <div style={{ padding: 20 }}>
      <h2>Select User</h2>

      {users.map((u) => (
        <button key={u} onClick={() => onSelect(u)}>
          Login {u}
        </button>
      ))}
    </div>
  );
}