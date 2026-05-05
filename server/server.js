import { WebSocketServer } from "ws";
import { EVENTS } from "../src/core/protocol/events.js";

const wss = new WebSocketServer({ port: 3000 });

console.log("🚀 ws://localhost:3000");

const users = new Map();

/*
users:
userId → {
  sockets: Set<WebSocket>,
  lastSeen: number,
  activeChat: string | null
}
*/

function ensureUser(userId) {
  if (!users.has(userId)) {
    users.set(userId, {
      sockets: new Set(),
      lastSeen: Date.now(),
      activeChat: null,
    });
  }
  return users.get(userId);
}

function isOnline(userId) {
  const user = users.get(userId);
  return user && user.sockets.size > 0;
}

function sendToUser(userId, data) {
  const user = users.get(userId);
  if (!user) return;

  user.sockets.forEach((ws) => {
    ws.send(JSON.stringify(data));
  });
}

wss.on("connection", (ws) => {
  let currentUser = null;

  console.log("🟢 connected");

  ws.on("close", () => {
    if (!currentUser) return;

    const user = users.get(currentUser);
    if (!user) return;

    user.sockets.delete(ws);
    user.lastSeen = Date.now();

    if (user.sockets.size === 0) {
      console.log(`🔴 ${currentUser} offline`);
    }
  });

  ws.on("message", (raw) => {
    const data = JSON.parse(raw);

    // REGISTER
    if (data.type === EVENTS.REGISTER) {
      currentUser = data.userId;

      const user = ensureUser(currentUser);
      user.sockets.add(ws);
      user.lastSeen = Date.now();

      console.log(`🟢 ${currentUser} online`);
      return;
    }

    // ACTIVE CHAT
    if (data.type === EVENTS.ACTIVE_CHAT_SET) {
      const user = ensureUser(currentUser);
      user.activeChat = data.conversationId;
      return;
    }

    // SEND MESSAGE
    if (data.type === EVENTS.SEND_MESSAGE) {
      const msg = data.payload;

      // server ack
      sendToUser(msg.from, {
        type: EVENTS.SERVER_ACK,
        messageId: msg.id,
        conversationId: msg.conversationId,
      });

      // delivered sadece online ise
      if (isOnline(msg.to)) {
        sendToUser(msg.to, {
          type: EVENTS.SEND_MESSAGE,
          payload: msg,
        });

        sendToUser(msg.from, {
          type: EVENTS.DELIVERED_ACK,
          messageId: msg.id,
          conversationId: msg.conversationId,
          deliveredAt: Date.now(),
        });
      }

      return;
    }

    // READ
    if (data.type === EVENTS.READ_MESSAGE) {
      const targetUser = data.to;

      const receiver = users.get(currentUser);

      // 🔥 KRİTİK CHECK
      if (
        receiver &&
        receiver.activeChat === data.conversationId
      ) {
        sendToUser(targetUser, {
          type: EVENTS.READ_ACK,
          messageId: data.messageId,
          conversationId: data.conversationId,
          readAt: Date.now(),
        });
      }

      return;
    }
  });
});