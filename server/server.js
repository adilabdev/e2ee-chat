import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

const clients = new Map(); // userId → ws

wss.on("connection", (ws) => {
  let userId = null;

  ws.on("message", (raw) => {
    try {
      const msg = JSON.parse(raw.toString());

      // REGISTER
      if (msg.type === "register") {
        userId = msg.userId;
        clients.set(userId, ws);

        console.log(`🟢 ${userId} connected`);
        return;
      }

      // MESSAGE ROUTING
      if (msg.type === "message") {
        const targetWs = clients.get(msg.to);

        if (targetWs && targetWs.readyState === 1) {
          targetWs.send(
            JSON.stringify({
              type: "message",
              from: msg.from,
              to: msg.to,
              text: msg.text,
            })
          );
        }
      }
    } catch (err) {
      console.error("Server error:", err);
    }
  });

  ws.on("close", () => {
    if (userId) {
      clients.delete(userId);
      console.log(`🔴 ${userId} disconnected`);
    }
  });
});

console.log("WS server running on ws://localhost:3000");