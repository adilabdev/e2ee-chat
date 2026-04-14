import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

// userId -> ws
const clients = new Map();

wss.on("connection", (ws) => {
  let userId = null;

  ws.on("message", (raw) => {
    let msg;

    try {
      msg = JSON.parse(raw.toString());
    } catch {
      return;
    }

    // REGISTER
    if (msg.type === "register") {
      userId = msg.userId;
      clients.set(userId, ws);
      console.log("🟢 connected:", userId);
      return;
    }

    // DIRECT MESSAGE
    if (msg.type === "message") {
      const targetWs = clients.get(msg.to);

      if (targetWs?.readyState === 1) {
        targetWs.send(JSON.stringify(msg));
      }
    }
  });

  ws.on("close", () => {
    if (userId) {
      clients.delete(userId);
      console.log("🔴 disconnected:", userId);
    }
  });
});

console.log("WS server ws://localhost:3000");