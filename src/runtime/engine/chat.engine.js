import {
  EVENTS,
} from "../../core/protocol/events";

import {
  MESSAGE_STATUS,
} from "../../core/constants/messageStatus";

export function createChatEngine({
  socket,
  store,
}) {
  const sendMessage = (message) => {
    store.addMessage(message);

    socket.send({
      type: EVENTS.SEND_MESSAGE,

      payload: message,
    });
  };

  const markAsRead = ({
    messageId,
    conversationId,
    to,
  }) => {
    socket.send({
      type: EVENTS.READ_MESSAGE,

      messageId,

      conversationId,

      to,
    });

    store.updateMessage(
      conversationId,
      messageId,
      {
        status:
          MESSAGE_STATUS.READ,

        readAt: Date.now(),

        readSent: true,
      }
    );
  };

  const handleSocketEvent = (
    data
  ) => {
    if (
      data.type ===
      EVENTS.SEND_MESSAGE
    ) {
      store.addMessage(data.payload);

      return;
    }

    if (
      data.type ===
      EVENTS.SERVER_ACK
    ) {
      store.updateMessage(
        data.conversationId,
        data.messageId,
        {
          status:
            MESSAGE_STATUS.SENT,
        }
      );

      return;
    }

    if (
      data.type ===
      EVENTS.DELIVERED_ACK
    ) {
      store.updateMessage(
        data.conversationId,
        data.messageId,
        {
          status:
            MESSAGE_STATUS.DELIVERED,

          deliveredAt:
            data.deliveredAt,
        }
      );

      return;
    }

    if (
      data.type ===
      EVENTS.READ_ACK
    ) {
      store.updateMessage(
        data.conversationId,
        data.messageId,
        {
          status:
            MESSAGE_STATUS.READ,

          readAt:
            data.readAt,
        }
      );
    }
  };

  return {
    sendMessage,

    markAsRead,

    handleSocketEvent,
  };
}