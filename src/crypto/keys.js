import nacl from "tweetnacl";

export function generateKeyPair() {
  const keyPair = nacl.box.keyPair();

  return {
    publicKey: keyPair.publicKey,
    secretKey: keyPair.secretKey,
  };
}