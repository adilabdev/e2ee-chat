import {
  WebSocketServer,
} from "ws";

import {
  EVENTS,
} from "../src/core/protocol/events.js";

console.log(
  "🚀 websocket server starting"
);

const wss =
  new WebSocketServer({
    port: 3000,
  });

console.log(
  "✅ ws://localhost:3000"
);

const clients = new Map();

function addClient(
  userId,
  ws
) {
  if (!clients.has(userId)) {
    clients.set(
      userId,
      new Set()
    );
  }

  clients
    .get(userId)
    .add(ws);
}

function removeClient(ws) {
  clients.forEach(
    (set, userId) => {
      set.delete(ws);

      if (set.size === 0) {
        clients.delete(userId);
      }
    }
  );
}

function isOnline(userId) {
  return clients.has(userId);
}

function sendToUser(
  userId,
  data
) {
  const sockets =
    clients.get(userId);

  if (!sockets) {
    return;
  }

  sockets.forEach((socket) => {
    socket.send(
      JSON.stringify(data)
    );
  });
}

wss.on(
  "connection",
  (ws) => {
    console.log(
      "🟢 connected"
    );

    let currentUser = null;

    ws.on("close", () => {
      console.log(
        "❌ disconnected"
      );

      removeClient(ws);
    });

    ws.on(
      "message",
      (raw) => {
        const data =
          JSON.parse(raw);

        console.log(
          "📩",
          data
        );

        if (
          data.type ===
          EVENTS.REGISTER
        ) {
          currentUser =
            data.userId;

          addClient(
            currentUser,
            ws
          );

          return;
        }

        if (
          data.type ===
          EVENTS.SEND_MESSAGE
        ) {
          const message =
            data.payload;

          sendToUser(
            message.from,
            {
              type:
                EVENTS.SERVER_ACK,

              messageId:
                message.id,

              conversationId:
                message.conversationId,
            }
          );

          const receiverOnline =
            isOnline(
              message.to
            );

          if (receiverOnline) {
            sendToUser(
              message.to,
              {
                type:
                  EVENTS.SEND_MESSAGE,

                payload:
                  message,
              }
            );

            sendToUser(
              message.from,
              {
                type:
                  EVENTS.DELIVERED_ACK,

                messageId:
                  message.id,

                conversationId:
                  message.conversationId,

                deliveredAt:
                  Date.now(),
              }
            );
          }

          return;
        }

        if (
          data.type ===
          EVENTS.READ_MESSAGE
        ) {
          sendToUser(
            data.to,
            {
              type:
                EVENTS.READ_ACK,

              messageId:
                data.messageId,

              conversationId:
                data.conversationId,

              readAt:
                Date.now(),
            }
          );
        }
      }
    );
  }
);