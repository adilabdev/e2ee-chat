import { useEffect, useRef } from "react";

export function useSocket(userId, onMessage) {
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "register",
        userId,
      }));
    };

    ws.onmessage = (event) => {
      try {
        onMessage(JSON.parse(event.data));
      } catch {}
    };

    ws.onerror = (e) => {
      console.log("socket error", e);
    };

    ws.onclose = () => {
      console.log("socket closed");
    };

    return () => ws.close();
  }, [userId]);

  const send = (data) => {
    if (wsRef.current?.readyState === 1) {
      wsRef.current.send(JSON.stringify(data));
    }
  };

  return { send };
}