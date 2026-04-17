export default function MessageList({ messages }) {
  const sorted = [...messages].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div>
      {sorted.map((m) => (
        <div key={m.id}>
          {m.from}: {m.content} ({m.status})
        </div>
      ))}
    </div>
  );
}