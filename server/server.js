import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

const clients = new Map(); // userId -> ws

console.log("🚀 WS running on ws://localhost:3000");

wss.on("connection", (ws) => {
  let userId = null;

  console.log("🟢 Client connected");

  ws.on("message", (raw) => {
    const data = JSON.parse(raw.toString());

    console.log("📩 RAW:", data);

    // REGISTER
    if (data.type === "register") {
      userId = data.userId;
      clients.set(userId, ws);

      console.log(`✅ ${userId} registered`);
      return;
    }

    // MESSAGE ROUTING
    if (data.type === "text") {
      const target = clients.get(data.to);

      if (target && target.readyState === 1) {
        target.send(JSON.stringify(data));
        console.log(`📤 ${data.from} → ${data.to}`);
      } else {
        console.log(`❌ ${data.to} offline`);
      }
    }
  });

  ws.on("close", () => {
    if (userId) {
      clients.delete(userId);
      console.log(`🔴 ${userId} disconnected`);
    }
  });
});
//kalsın