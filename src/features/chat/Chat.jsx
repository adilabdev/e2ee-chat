import { useState } from "react";
import { useSocket } from "../../shared/hooks/useSocket";

export default function Chat({ userId }) {
  const [target, setTarget] = useState("B");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const { send } = useSocket(userId, (data) => {
    if (data.type === "message") {
      setMessages((prev) => [
        ...prev,
        `${data.from}: ${data.text}`,
      ]);
    }
  });

  const handleSend = () => {
    send({
      type: "message",
      from: userId,
      to: target,
      text,
    });

    setText("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat ({userId})</h2>

      <div>
        <strong>Chat with:</strong>

        {["A", "B", "C", "D"].map((u) => (
          <button key={u} onClick={() => setTarget(u)}>
            {u}
          </button>
        ))}
      </div>

      <h4>Target: {target}</h4>

      <div style={{ margin: 10 }}>
        {messages.map((m, i) => (
          <div key={i}>💬 {m}</div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={handleSend}>Send</button>
    </div>
  );
}