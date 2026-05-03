import { useState }
from "react";

import {
  createMessage,
} from "../../core/protocol/createMessage";

export default function ChatInput({
  user,
  peer,
  runtime,
}) {
  const [text, setText]
    = useState("");

  const handleSend = () => {
    if (!text.trim()) {
      return;
    }

    const message =
      createMessage({
        from: user,

        to: peer,

        content: text,
      });

    runtime.sendMessage(
      message
    );

    setText("");
  };

  return (
    <div
      style={{
        marginTop: 24,
        display: "flex",
        gap: 8,
      }}
    >
      <input
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        style={{
          flex: 1,
        }}
      />

      <button onClick={handleSend}>
        Send
      </button>
    </div>
  );
}