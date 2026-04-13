import nacl from "tweetnacl";

export function decryptMessage(data, senderPublicKey, receiverSecretKey) {
  try {
    const message = nacl.box.open(
      new Uint8Array(data.encrypted),
      new Uint8Array(data.nonce),
      new Uint8Array(senderPublicKey),
      receiverSecretKey
    );

    if (!message) return null;

    return new TextDecoder().decode(message);
  } catch (err) {
    console.error("decrypt error:", err);
    return null;
  }
}