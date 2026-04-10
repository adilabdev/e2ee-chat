import nacl from "tweetnacl";
import * as util from "tweetnacl-util";

export function encryptMessage(message, receiverPublicKey, senderSecretKey) {
  const nonce = nacl.randomBytes(24);

  const messageUint8 = util.decodeUTF8(message);

  const encrypted = nacl.box(
    messageUint8,
    nonce,
    receiverPublicKey,
    senderSecretKey
  );

  return {
    encrypted,
    nonce,
  };
}