import { useState } from "react";
import { createMessage } from "./messageService";

export default function ChatInput({ store, user, send }) {
  const [text, setText] = useState("");
  const peer = store.activeChat;

  const handleSend = () => {
    if (!peer || !text.trim()) return;

    const msg = createMessage({
      from: user,
      to: peer,
      content: text,
    });

    store.addMessage(msg); // optimistic
    send(msg);

    setText("");
  };

  return (
    <div style={{ display: "flex", gap: 10 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}