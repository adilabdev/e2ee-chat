import { useEffect }
from "react";

import {
  buildConversationId,
} from "../../core/protocol/conversation";

import MessageList
from "./MessageList";

import ChatInput
from "./ChatInput";

export default function ChatWindow({
  user,
  store,
  runtime,
}) {
  const peer =
    store.activeChat;

  if (!peer) {
    return <div>Select chat</div>;
  }

  const conversationId =
    buildConversationId(
      user,
      peer
    );

  const conversation =
    store.conversations[
      conversationId
    ];

  const messages =
    conversation
      ? conversation.messageOrder.map(
          (id) =>
            conversation
              .messagesById[id]
        )
      : [];

  useEffect(() => {
    messages.forEach((m) => {
      const shouldRead =
        m.from === peer &&
        !m.readAt &&
        !m.readSent;

      if (!shouldRead) {
        return;
      }

      runtime.markAsRead({
        messageId: m.id,

        conversationId,

        to: peer,
      });
    });
  }, [messages]);

  return (
    <div style={{ flex: 1 }}>
      <h2>
        Chat with {peer}
      </h2>

      <MessageList
        messages={messages}
        currentUser={user}
      />

      <ChatInput
        user={user}
        peer={peer}
        runtime={runtime}
      />
    </div>
  );
}