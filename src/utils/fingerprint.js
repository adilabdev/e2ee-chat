export function getFingerprint(publicKey) {
  return Array.from(publicKey)
    .slice(0, 10)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(":");
}