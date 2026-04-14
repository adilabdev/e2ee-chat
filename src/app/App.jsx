import { useState } from "react";
import UserSelect from "../features/user/UserSelect";
import ChatShell from "../features/chat/ChatShell";
import { useSocket } from "../shared/hooks/useSocket";
import { useChatStore } from "../features/chat/chatStore";

export default function App() {
  const [user, setUser] = useState(null);

  const store = useChatStore();

  const { send } = useSocket(user, (msg) => {
    if (msg.type === "message") {
      store.addMessage(msg);
    }
  });

  if (!user) {
    return <UserSelect onSelect={setUser} />;
  }

  return (
    <ChatShell
      user={{ id: user, store }}
      send={send}
    />
  );
}