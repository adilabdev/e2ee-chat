import { useState } from "react";
import Setup from "./components/Setup";
import Chat from "./components/Chat";

function App() {
  const [keys, setKeys] = useState(null);
  const [fingerprint, setFingerprint] = useState(null);

  if (!keys) {
    return (
      <Setup
        onReady={(k, f) => {
          setKeys(k);
          setFingerprint(f);
        }}
      />
    );
  }

  return (
    <div>
      <h3>Fingerprint: {fingerprint}</h3>

      <Chat keys={keys} />
    </div>
  );
}

export default App;