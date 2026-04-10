import { useState } from "react";
import { encryptMessage } from "../crypto/encrypt";
import { useSocket } from "../hooks/useSocket";

export default function Chat({ keys }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { send } = useSocket((data) => {
    setMessages((prev) => [...prev, data]);
  });

  const sendMessage = () => {
    const encrypted = encryptMessage(
      message,
      keys.publicKey, // demo (self chat)
      keys.secretKey
    );

    send(encrypted);
    setMessage("");
  };

  return (
    <div>
      <h2>Chat</h2>

      <div>
        {messages.map((m, i) => (
          <div key={i}>
            🔐 Encrypted msg: {JSON.stringify(m)}
          </div>
        ))}
      </div>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}