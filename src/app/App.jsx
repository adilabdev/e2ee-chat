import { useState } from "react";

import UserSelect from "../features/user/UserSelect";
import ChatShell from "../features/chat/ChatShell";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return (
      <UserSelect onSelect={setUser} />
    );
  }

  return <ChatShell user={user} />;
}