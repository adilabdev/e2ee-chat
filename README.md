KOPYALA / YAPIŞTIR

# 🔐 E2EE Chat (Signal-lite Educational Project)

A real-time **End-to-End Encrypted (E2EE) chat system** built with React, Vite, WebSocket, and TweetNaCl.

This project demonstrates how secure messaging applications (like Signal) work internally:
identity generation, encryption flow, message transport separation, and cryptographic design principles.

---

# 🚀 Features

- 🔐 Public / Private key generation (NaCl box cryptography)
- 🧾 Persistent identity stored in browser (localStorage)
- 🧠 Fingerprint-based identity verification system
- 💬 End-to-end encrypted messaging (client-side encryption)
- 🌐 WebSocket real-time message relay (server cannot read messages)
- 🔒 Separation of encryption layer and transport layer
- ⚡ React + Vite modern frontend architecture

---

# ⚙️ Tech Stack

## Frontend
- React (UI framework)
- Vite (build tool / dev server)
- JavaScript (ES6)

## Cryptography
- TweetNaCl (public-key cryptography)
- NaCl.box (authenticated encryption)
- nonce-based encryption (prevents replay attacks)

## Communication
- WebSocket (Node.js server)
- real-time message relay (no message inspection)

---

# 🧠 System Architecture


User A (Browser)
↓ encrypt(message, User B publicKey)
WebSocket Server (relay only - no decryption)
↓
User B (Browser)
↓ decrypt(message, User A publicKey)


👉 Important:
The server NEVER sees plaintext messages.

---

# 🧾 Fingerprint System (Identity Verification)

Each user has a cryptographic identity based on a keypair:

- Public Key → shared with others
- Private Key → stays in browser (never shared)

## 🔍 What is Fingerprint?

A fingerprint is a **short human-readable representation of a public key**.

Example:

Fingerprint: 21:ba:c0:77:24:62:8f:28:a8:1:1f:aa


## 🎯 Purpose:

- Verify identity between users manually
- Prevent impersonation attacks
- Used like “security code” in Signal

👉 If two users see same fingerprint = identity is trusted

---

# 🏗️ Project Structure


e2ee-chat/
│
├── public/
│
├── server/
│ └── server.js # WebSocket relay server (no encryption logic)
│
├── src/
│ │
│ ├── components/
│ │ ├── Setup.jsx # Identity creation screen
│ │ ├── Chat.jsx # Chat UI + messaging logic
│ │
│ ├── crypto/
│ │ ├── keys.js # Keypair generation + persistence
│ │ ├── encrypt.js # Message encryption (nacl.box)
│ │ ├── decrypt.js # Message decryption
│ │
│ ├── utils/
│ │ ├── fingerprint.js # Public key → fingerprint generator
│ │
│ ├── hooks/
│ │ ├── useSocket.js # WebSocket communication layer
│ │
│ ├── App.jsx
│ ├── main.jsx
│
├── package.json
└── vite.config.js


---

# 🧠 Module Responsibilities

## 🔐 crypto/keys.js
- Generates public/private keypair
- Stores identity in localStorage
- Ensures persistent identity per browser

---

## 🔐 crypto/encrypt.js
- Encrypts message using receiver public key
- Uses sender secret key for authentication
- Outputs encrypted payload + nonce

---

## 🔐 crypto/decrypt.js
- Decrypts incoming message
- Uses sender public key + own secret key
- Returns plaintext message

---

## 🧾 utils/fingerprint.js
- Converts public key into short readable hash
- Used for identity verification between users

---

## 💬 components/Chat.jsx
- UI for messaging
- Handles encryption before sending
- Handles decryption on receive

---

## 🔌 hooks/useSocket.js
- Connects to WebSocket server
- Sends / receives encrypted messages
- Acts as transport layer only

---

# 🧪 How it works

## 1. Identity creation
User generates keypair:

- publicKey → shared
- secretKey → stored locally

---

## 2. Messaging flow

### Sending:

message → encrypt → send via WebSocket


### Receiving:

receive → decrypt → display


---

## 3. Security model

- Encryption happens on client
- Server only forwards encrypted data
- No plaintext exposure on backend

---

# 🧪 Real Test Results

## 🖥️ Browser 1


Fingerprint: 21:ba:c0:77:24:62:8f:28:a8:1:1f:aa
Chat:
💬 yut
💬 8768
💬 ⚠️ Decryption failed


---

## 🖥️ Browser 2


Fingerprint: 27:50:87:60:a8:ce:a9:69:e6:14:cd:6
Chat:
💬 123
💬 1231


---

## ⚠️ Current Limitation

- No peer mapping (Alice/Bob system missing)
- Same keys used incorrectly across sessions
- Decryption fails for cross-user messages

👉 This is expected in Phase 3 (pre-peer architecture)

---

# 📌 Limitations

- No QR-based identity exchange yet
- No session key agreement
- No forward secrecy
- No authentication layer
- Single-device simulation model

---

# 🚧 Next Phase (Roadmap)

- 📱 QR code identity exchange
- 👥 Alice ↔ Bob real chat system
- 🔁 Proper sender/receiver key mapping
- 🔐 Fix decryption across peers
- 🧩 Signal-like session architecture

---

# 🧪 How to run locally

## 1. Install dependencies
```bash
npm install
2. Start frontend
npm run dev
3. Start backend server
cd server
node server.js
4. Open in browser
http://localhost:5173
⚠️ Disclaimer

This project is for educational purposes only.

It demonstrates E2EE concepts but is NOT production-grade secure messaging.

👨‍💻 Author

Built as a learning project exploring:

Cryptography fundamentals
Secure messaging systems
Real-time web architecture
Signal-like E2EE design principles