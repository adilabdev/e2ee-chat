import { useEffect, useRef } from "react";

export function useSocket(onMessage) {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:3000");

    ws.current.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };

    return () => ws.current.close();
  }, []);

  const send = (data) => {
    ws.current.send(JSON.stringify(data));
  };

  return { send };
}