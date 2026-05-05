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
  if (!peer) return;

  const unread = messages.filter((m) => {
    return (
      m.from === peer &&
      !m.readAt &&
      !m.readSent
    );
  });

  unread.forEach((m) => {
    runtime.markAsRead({
      messageId: m.id,
      conversationId,
      to: peer,
    });
  });
}, [messages, peer]);

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