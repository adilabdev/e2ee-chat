import { useState } from "react";
import { encryptMessage } from "../crypto/encrypt";
import { decryptMessage } from "../crypto/decrypt";
import { useSocket } from "../hooks/useSocket";

export default function Chat({ keys }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { send } = useSocket((data) => {
    const decrypted = decryptMessage(
      data,
      keys.publicKey,
      keys.secretKey
    );

    setMessages((prev) => [
      ...prev,
      decrypted || "⚠️ Decryption failed",
    ]);
  });

  const sendMessage = () => {
    const encrypted = encryptMessage(
      message,
      keys.publicKey,
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
          <div key={i}>💬 {m}</div>
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