import { useEffect, useRef } from "react";

export function useSocket(userId, onMessage) {
  const wsRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "register", userId }));
    };

    ws.onmessage = (e) => {
      onMessage(JSON.parse(e.data));
    };

    return () => ws.close();
  }, [userId]);

  const send = (data) => {
    wsRef.current?.send(JSON.stringify(data));
  };

  return { send };
}