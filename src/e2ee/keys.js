import nacl from "tweetnacl";

const STORAGE = "e2ee_keys_";

export function getOrCreateKeyPair(userId) {
  const key = STORAGE + userId;
  const saved = localStorage.getItem(key);

  if (saved) {
    const parsed = JSON.parse(saved);

    return {
      publicKey: new Uint8Array(parsed.publicKey),
      secretKey: new Uint8Array(parsed.secretKey),
    };
  }

  const pair = nacl.box.keyPair();

  localStorage.setItem(
    key,
    JSON.stringify({
      publicKey: Array.from(pair.publicKey),
      secretKey: Array.from(pair.secretKey),
    })
  );

  return pair;
}