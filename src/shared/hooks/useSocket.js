import { useEffect, useRef } from "react";

export function useSocket(userId, onMessage) {
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "register",
          userId,
        })
      );
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (err) {
        console.error("Parse error", err);
      }
    };

    ws.onerror = (e) => {
      console.log("Socket error", e);
    };

    ws.onclose = () => {
      console.log("Socket closed");
    };

    return () => ws.close();
  }, [userId]);

  const send = (data) => {
    if (!wsRef.current || wsRef.current.readyState !== 1) return;

    wsRef.current.send(JSON.stringify(data));
  };

  return { send };
}