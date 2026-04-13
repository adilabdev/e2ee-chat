export function fingerprint(publicKey) {
  return Array.from(publicKey)
    .slice(0, 12)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(":");
}