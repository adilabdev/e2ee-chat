import { useEffect, useRef } from "react";

export function useSocket(onMessage) {
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3000");

    socketRef.current.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };

    return () => socketRef.current.close();
  }, []);

  const send = (data) => {
    socketRef.current.send(JSON.stringify(data));
  };

  return { send };
}