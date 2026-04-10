import { generateKeyPair } from "../crypto/keys";
import { getFingerprint } from "../utils/fingerprint";

export default function Setup({ onReady }) {
  const handleCreate = () => {
    const keys = generateKeyPair();

    const fingerprint = getFingerprint(keys.publicKey);

    onReady(keys, fingerprint);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 Create Identity</h2>
      <button onClick={handleCreate}>Generate Keys</button>
    </div>
  );
}