import { getOrCreateKeyPair } from "../e2ee/keys";
import { fingerprint } from "../utils/fingerprint";

export default function Setup({ onReady }) {
  const handleCreate = () => {
    const keys = getOrCreateKeyPair();
    const fp = fingerprint(keys.publicKey);

    onReady(keys, fp);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 Create Identity</h2>
      <button onClick={handleCreate}>Generate Keys</button>
    </div>
  );
}