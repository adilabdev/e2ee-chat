import { useState } from "react";
import { encryptMessage } from "../crypto/encrypt";

export default function Chat({ keys, receiverPublicKey }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    const encrypted = encryptMessage(
      message,
      receiverPublicKey,
      keys.secretKey
    );

    console.log("ENCRYPTED MESSAGE:", encrypted);
    setMessage("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 Chat</h2>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}