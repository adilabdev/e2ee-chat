import { useState } from "react";
import { encryptMessage } from "../crypto/encrypt";
<<<<<<< HEAD
import { useSocket } from "../hooks/useSocket";

export default function Chat({ keys }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { send } = useSocket((data) => {
    setMessages((prev) => [...prev, data]);
  });
=======

export default function Chat({ keys, receiverPublicKey }) {
  const [message, setMessage] = useState("");
>>>>>>> c62510de094956c99168352947b4c371320d2592

  const sendMessage = () => {
    const encrypted = encryptMessage(
      message,
<<<<<<< HEAD
      keys.publicKey, // demo (self chat)
      keys.secretKey
    );

    send(encrypted);
=======
      receiverPublicKey,
      keys.secretKey
    );

    console.log("ENCRYPTED MESSAGE:", encrypted);
>>>>>>> c62510de094956c99168352947b4c371320d2592
    setMessage("");
  };

  return (
<<<<<<< HEAD
    <div>
      <h2>Chat</h2>

      <div>
        {messages.map((m, i) => (
          <div key={i}>
            🔐 Encrypted msg: {JSON.stringify(m)}
          </div>
        ))}
      </div>
=======
    <div style={{ padding: 20 }}>
      <h2>💬 Chat</h2>
>>>>>>> c62510de094956c99168352947b4c371320d2592

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
<<<<<<< HEAD
=======
        placeholder="Message"
>>>>>>> c62510de094956c99168352947b4c371320d2592
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}