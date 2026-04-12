import nacl from "tweetnacl";
import * as util from "tweetnacl-util";

export function decryptMessage(data, senderPublicKey, receiverSecretKey) {
  try {
    const decrypted = nacl.box.open(
      new Uint8Array(data.encrypted),
      new Uint8Array(data.nonce),
      new Uint8Array(senderPublicKey),
      receiverSecretKey
    );

    if (!decrypted) return null;

    return util.encodeUTF8(decrypted);
  } catch (err) {
    return null;
  }
}