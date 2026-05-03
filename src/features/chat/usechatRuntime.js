import { useMemo } from "react";

import {
  createChatEngine,
} from "../../runtime/engine/chat.engine";

export function useChatRuntime({
  socket,
  store,
}) {
  return useMemo(() => {
    return createChatEngine({
      socket,
      store,
    });
  }, [socket, store]);
}