import nacl from "tweetnacl";

const STORAGE_KEY = "e2ee-keypair";

export function getOrCreateKeyPair() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    const parsed = JSON.parse(saved);

    return {
      publicKey: new Uint8Array(parsed.publicKey),
      secretKey: new Uint8Array(parsed.secretKey),
    };
  }

  const keyPair = nacl.box.keyPair();

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      publicKey: Array.from(keyPair.publicKey),
      secretKey: Array.from(keyPair.secretKey),
    })
  );

  return keyPair;
}