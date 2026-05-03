import { buildConversationId }
from "./conversation";

import {
  MESSAGE_STATUS,
} from "../constants/messageStatus";

export function createMessage({
  from,
  to,
  content,
}) {
  return {
    id: crypto.randomUUID(),

    type: "text",

    from,
    to,

    content,

    conversationId:
      buildConversationId(from, to),

    status:
      MESSAGE_STATUS.PENDING,

    sentAt: Date.now(),

    deliveredAt: null,

    readAt: null,
  };
}