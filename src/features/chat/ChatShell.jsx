import {
  useEffect,
  useRef,
} from "react";

import {
  SocketClient,
} from "../../network/socket/socket.client";

import {
  useChatStore,
} from "../../runtime/store/useChatStore";

import {
  useChatRuntime,
} from "./useChatRuntime";

import ConversationList from "./ConversationList";
import ChatWindow from "./ChatWindow";

export default function ChatShell({
  user,
}) {
  const store = useChatStore();

  const socketRef = useRef(null);

  const runtimeRef = useRef(null);

  if (!socketRef.current) {
    socketRef.current =
      new SocketClient({
        userId: user,

        onMessage: (data) => {
          runtimeRef.current
            ?.handleSocketEvent(data);
        },
      });
  }

  const runtime =
    useChatRuntime({
      socket: socketRef.current,
      store,
    });

  runtimeRef.current = runtime;

  useEffect(() => {
    socketRef.current.connect();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        padding: 20,
      }}
    >
      <ConversationList
        user={user}
        store={store}
      />

      <ChatWindow
        user={user}
        store={store}
        runtime={runtime}
      />
    </div>
  );
}