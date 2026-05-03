export function buildConversationId(a, b) {
  return [a, b]
    .sort()
    .join("-");
}