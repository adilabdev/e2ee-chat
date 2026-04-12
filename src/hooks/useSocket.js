import { useEffect, useRef } from "react";

export function useSocket(onMessage) {
  const ws = useRef(null);

  useEffect(() => {
    if (ws.current) return; // 🔥 DOUBLE CONNECT ENGELİ

    ws.current = new WebSocket("ws://localhost:3000");

    ws.current.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    ws.current.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };

    ws.current.onclose = () => {
      console.log("❌ WebSocket closed");
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => {
      // ⚠️ DEV MODE için kapatma yapma
      // ws.current.close();
    };
  }, []);

  const send = (data) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(data));
    } else {
      console.warn("Socket not ready");
    }
  };

  return { send };
}