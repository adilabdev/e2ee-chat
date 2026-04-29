import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

const clients = new Map();

console.log("🚀 WS running on ws://localhost:3000");

wss.on("connection", (ws) => {
  let userId = null;

  console.log("🟢 Client connected");

  ws.on("message", (raw) => {
    let data;

    try {
      data = JSON.parse(raw);
    } catch {
      console.log("❌ invalid JSON");
      return;
    }

    console.log("📩 RAW:", data);

    // REGISTER
    if (data.type === "register") {
      userId = data.userId;

      if (!clients.has(userId)) {
        clients.set(userId, new Set());
      }

      clients.get(userId).add(ws);

      console.log("✅ registered:", userId);
    }

    // TEXT MESSAGE
    if (data.type === "text") {
      const target = clients.get(data.to);

      const sentAt = data.timestamp;
      const deliveredAt = Date.now();

      // RECEIVER
      if (target) {
        target.forEach((c) => {
          c.send(
            JSON.stringify({
              ...data,
              sentAt,
              deliveredAt,
            })
          );
        });

        console.log(`📤 ${data.from} → ${data.to}`);

        // SENDER DELIVERY UPDATE
        const sender = clients.get(data.from);

        sender?.forEach((c) => {
          c.send(
            JSON.stringify({
              type: "delivered",
              messageId: data.id,
              deliveredAt,
            })
          );
        });
      } else {
        console.log(`❌ user offline: ${data.to}`);
      }
    }

    // READ EVENT
    if (data.type === "read") {
      const target = clients.get(data.to);

      const readAt = Date.now();

      target?.forEach((c) => {
        c.send(
          JSON.stringify({
            type: "read",
            messageId: data.messageId,
            readAt,
          })
        );
      });

      console.log("👁 read:", data.messageId);
    }
  });

  ws.on("close", () => {
    if (!userId) return;

    const set = clients.get(userId);

    if (!set) return;

    set.delete(ws);

    if (set.size === 0) {
      clients.delete(userId);
    }

    console.log("🔴 disconnected:", userId);
  });
});