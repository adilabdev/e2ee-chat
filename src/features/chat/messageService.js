export function createMessage({ from, to, content }) {
  return {
    type: "text",
    id: crypto.randomUUID(),
    from,
    to,
    content,
    conversationId: [from, to].sort().join("-"),

    sentAt: Date.now(),
    deliveredAt: null,
    readAt: null
  };
}