import { createMessage } from "../../core/protocol/createMessage";

export function sendTextMessage({
  from,
  to,
  content,
  send,
}) {
  const msg = createMessage({
    from,
    to,
    content,
  });

  send(msg);

  return msg;
}