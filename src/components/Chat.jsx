import { useState } from "react";
import { encryptMessage } from "../crypto/encrypt";
import { decryptMessage } from "../crypto/decrypt";
import { useSocket } from "../hooks/useSocket";

export default function Chat({ keys }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [peerKeyInput, setPeerKeyInput] = useState("");
  const [peerPublicKey, setPeerPublicKey] = useState(null);

  /**
   * 📥 RECEIVE
   */
  const { send } = useSocket((data) => {
    const decrypted = decryptMessage(
      data,
      data.senderPublicKey,
      keys.secretKey
    );

    setMessages((prev) => [
      ...prev,
      decrypted || "⚠️ Decryption failed",
    ]);
  });

  /**
   * 🔑 Peer key ayarla
   */
  const handleSetPeerKey = () => {
    try {
      const parsed = JSON.parse(peerKeyInput);

      if (!Array.isArray(parsed) || parsed.length !== 32) {
        throw new Error();
      }

      setPeerPublicKey(new Uint8Array(parsed));
      alert("Peer key set edildi ✅");
    } catch {
      alert("Geçersiz key ❌ (32 elemanlı array olmalı)");
    }
  };

  /**
   * 📤 SEND
   */
  const sendMessage = () => {
    if (!peerPublicKey) {
      alert("Peer public key yok!");
      return;
    }

    const encrypted = encryptMessage(
      message,
      peerPublicKey,
      keys.secretKey
    );

    send({
      encrypted: encrypted.encrypted,
      nonce: encrypted.nonce,
      senderPublicKey: Array.from(keys.publicKey),
    });

    setMessage("");
  };

  return (
    <div>
      <h2>Chat</h2>

      {/* 🔐 Kendi key */}
      <div>
        <strong>Your Public Key:</strong>
        <pre style={{ fontSize: 10 }}>
          {JSON.stringify(Array.from(keys.publicKey))}
        </pre>
      </div>

      {/* 🔑 Peer key */}
      <textarea
        placeholder="Paste peer public key"
        value={peerKeyInput}
        onChange={(e) => setPeerKeyInput(e.target.value)}
        rows={3}
        style={{ width: "100%", marginTop: 10 }}
      />

      <button onClick={handleSetPeerKey}>
        Set Peer Key
      </button>

      {/* 💬 Messages */}
      <div style={{ marginTop: 20 }}>
        {messages.map((m, i) => (
          <div key={i}>💬 {m}</div>
        ))}
      </div>

      {/* ✍️ Input */}
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
}