import { useEffect, useRef } from "react";

export function useSocket(userId, onMessage) {
  const wsRef = useRef(null);

  useEffect(() => {
    if (wsRef.current) return;

    const ws = new WebSocket("ws://localhost:3000");
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ connected");

      ws.send(JSON.stringify({
        type: "register",
        userId
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📩 RECEIVE:", data);
      onMessage(data);
    };

    ws.onerror = (e) => console.log("❌ socket error", e);
    ws.onclose = () => console.log("🔴 socket closed");

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [userId]);

  const send = (data) => {
    if (wsRef.current?.readyState === 1) {
      console.log("📤 SEND:", data);
      wsRef.current.send(JSON.stringify(data));
    }
  };

  return { send };
}