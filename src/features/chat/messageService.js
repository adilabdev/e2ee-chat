export function createMessage({ from, to, content }) {
  return {
    type: "text",
    id: crypto.randomUUID(),
    from,
    to,
    content,
    timestamp: Date.now(),
    status: "sent",
    conversationId: [from, to].sort().join("-"),
    deleted: false,
  };
}