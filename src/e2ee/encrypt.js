import nacl from "tweetnacl";

export function encryptMessage(message, receiverPublicKey, senderSecretKey) {
  const nonce = nacl.randomBytes(24);

  const msg = new TextEncoder().encode(message);

  const encrypted = nacl.box(
    msg,
    nonce,
    receiverPublicKey,
    senderSecretKey
  );

  return {
    encrypted: Array.from(encrypted),
    nonce: Array.from(nonce),
  };
}