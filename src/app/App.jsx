import { useState } from "react";
import Chat from "../features/chat/Chat";
import UserSelect from "../features/user/UserSelect";

export default function App() {
  const [userId, setUserId] = useState(null);

  if (!userId) {
    return <UserSelect onSelect={setUserId} />;
  }

  return (
    <div>
      <h2>Logged in as: {userId}</h2>
      <Chat userId={userId} />
    </div>
  );
}