📄 README (KOPYALA YAPIŞTIR)
# 🔐 E2EE Chat (Signal-lite)

A minimal **end-to-end encrypted chat application** built with React, Vite, and TweetNaCl.

This project demonstrates how modern secure messaging systems work at a simplified level:
identity generation, encryption, and message transport separation.

---

# 🚀 Features

- 🔐 Public / Private key identity generation
- 🧾 Fingerprint generation for identity verification
- 💬 End-to-end encrypted messaging (client-side)
- ⚡ React + Vite frontend
- 🧠 Cryptography using TweetNaCl
- 🌐 WebSocket-ready architecture (future extension)

---

# 🧠 How it works (Concept)

This project simulates a simplified secure messaging system:

### 1. Identity creation
Each user generates a key pair:

- Public key → shared with others
- Private key → never leaves device

---

### 2. Fingerprint verification
Public key is converted into a short fingerprint string so users can manually verify identities.

---

### 3. Message encryption
Before sending:

- Message is encrypted on the client
- Receiver's public key is used
- Sender’s secret key is used

👉 Server never sees plaintext messages

---

### 4. Message transport
(Current version)
- Messages are logged / simulated locally

(Future version)
- WebSocket server will relay encrypted messages between users

---

# 🏗️ Project Structure


src/
├── components/
│ ├── Setup.jsx # Identity creation UI
│ ├── Chat.jsx # Messaging UI
│
├── crypto/
│ ├── keys.js # Key generation
│ ├── encrypt.js # Encryption logic
│ ├── decrypt.js # Decryption logic
│
├── utils/
│ ├── fingerprint.js # Public key hashing
│
├── App.jsx


---

# ⚙️ Tech Stack

- React (UI)
- Vite (build tool)
- TweetNaCl (cryptography)
- JavaScript (no TypeScript for simplicity)

---

# 🔐 Security Model

This project follows a simplified E2EE model:

- Encryption happens entirely on the client
- Server (future WebSocket server) acts only as a message relay
- Private keys never leave the user's device
- Messages are encrypted using public-key cryptography

⚠️ This is a learning/demo project, not production-secure messaging.

---

# 🧪 How to run locally

## 1. Clone the project

```bash
git clone https://github.com/YOUR_USERNAME/e2ee-chat.git
cd e2ee-chat
2. Install dependencies
npm install
3. Start development server
npm run dev
4. Open in browser
http://localhost:5173
📌 Current Limitations
No real backend yet (WebSocket not implemented)
Single-user simulation only
No persistent chat storage
No QR-based key exchange yet
🚧 Planned Features
🌐 WebSocket real-time messaging
📱 QR code-based public key sharing
👥 Multi-user chat rooms
🔁 Message encryption + decryption UI
🧩 Fingerprint verification flow
🎯 What I learned from this project

This project helped me understand:

Public-key cryptography basics
End-to-end encryption flow
Client-side security design
Separation of UI and crypto logic
Real-time system architecture basics
⚠️ Disclaimer

This project is for educational purposes only.
It is not intended for production use or real secure communication.

👨‍💻 Author

Built as a learning project exploring secure communication systems and cryptography fundamentals.


---

#