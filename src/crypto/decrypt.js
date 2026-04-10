import nacl from "tweetnacl";
import * as util from "tweetnacl-util";

export function decryptMessage(data, senderPublicKey, receiverSecretKey) {
  const decrypted = nacl.box.open(
    new Uint8Array(data.encrypted),
    new Uint8Array(data.nonce),
    senderPublicKey,
    receiverSecretKey
  );

  if (!decrypted) return null;

  return util.encodeUTF8(decrypted);
}