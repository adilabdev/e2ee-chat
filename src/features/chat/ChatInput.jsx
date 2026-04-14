import { useState } from "react";

export default function ChatInput({ store, user, send }) {
  const [text, setText] = useState("");
  const peer = store.activeChat;

  const handleSend = () => {
    if (!peer) {
      alert("Select user first");
      return;
    }

    const msg = {
      type: "message",
      from: user,
      to: peer,
      text,
    };

    send(msg);
    store.addMessage(msg);

    setText("");
  };

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <input
        value={text}
        disabled={!peer}
        onChange={(e) => setText(e.target.value)}
        placeholder={peer ? "Message..." : "Select user first"}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}