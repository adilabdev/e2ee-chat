↓
User B (Browser)
↓ decrypt(message, User A publicKey)

👉 Important:
The server NEVER sees plaintext messages.

---

# 🧾 Fingerprint System (Identity Verification)

Each user has a cryptographic identity:

- Public Key → shared
- Private Key → stays in browser

## 🔍 Fingerprint Example


21:ba:c0:77:24:62:8f:28:a8:01:1f:aa


## 🎯 Purpose

- Manual identity verification
- Prevent impersonation
- Simulates Signal safety number

---

# 🏗️ Project Structure


e2ee-chat/
│
├── server/
│ └── server.js # WebSocket relay server
│
├── src/
│
│ ├── components/
│ │ ├── Setup.jsx # Identity creation
│ │ └── Chat.jsx # Chat UI + logic
│
│ ├── crypto/
│ │ ├── keys.js
│ │ ├── encrypt.js
│ │ └── decrypt.js
│
│ ├── hooks/
│ │ └── useSocket.js
│
│ ├── utils/
│ │ └── fingerprint.js
│
│ ├── App.jsx
│ └── main.jsx


---

# 🧠 Module Responsibilities

## 🔐 keys.js
- Generates keypair
- Stores identity in localStorage
- Provides persistent identity per browser

---

## 🔐 encrypt.js
- Encrypts message using:
  - receiver public key
  - sender secret key
- Outputs:
  - encrypted payload
  - nonce

---

## 🔐 decrypt.js
- Decrypts message using:
  - sender public key
  - receiver secret key
- Returns plaintext or null

---

## 🧾 fingerprint.js
- Converts public key into readable string
- Used for identity verification

---

## 💬 Chat.jsx
- Displays messages
- Handles encryption before sending
- Handles decryption after receiving
- Allows manual peer key input

---

## 🔌 useSocket.js
- Manages WebSocket connection
- Sends / receives messages
- Transport layer only

---

# 🧪 Message Flow

## 📤 Sending

message → encrypt → send via WebSocket

## 📥 Receiving

receive → decrypt → display

---

# 🔐 Security Model

- Encryption is client-side
- Server only relays encrypted data
- Private keys never leave device
- Uses public-key cryptography

---

# 🧪 Current Output (Real Test)

## 🖥️ Browser A


Fingerprint: 27:50:87:60:a8:ce:a9:69:e6:14:cd:06

Chat
Your Public Key:
[39,80,135,96,168,206,169,105,230,20,205,6,161,59,114,48,72,131,37,143,76,188,238,193,216,168,93,170,255,28,213,110]

[33,186,192,119,36,98,143,40,168,1,31,170,222,200,149,146,195,146,114,255,143,122,203,41,13,98,247,53,79,83,248,17]

Set Peer Key

💬 ⚠️ Decryption failed
💬 asdasd

Send


---

## 🖥️ Browser B


Fingerprint: 21:ba:c0:77:24:62:8f:28:a8:01:1f:aa

Chat
Your Public Key:
[33,186,192,119,36,98,143,40,168,1,31,170,222,200,149,146,195,146,114,255,143,122,203,41,13,98,247,53,79,83,248,17]

[39,80,135,96,168,206,169,105,230,20,205,6,161,59,114,48,72,131,37,143,76,188,238,193,216,168,93,170,255,28,213,110]

Set Peer Key

💬 [33,186,192,119,...]
💬 asdadaf

Send


---

# ⚠️ Current Limitations (IMPORTANT)

- ❌ Broadcast messaging (no direct routing)
- ❌ No peer identity mapping (A ↔ B not fixed)
- ❌ Wrong key usage can break decryption
- ❌ Messages may go to unintended peer
- ❌ No session-based encryption

## ❗ Why "Decryption failed" happens

Example scenario:

- User A starts chat with User B
- But then encrypts using **wrong public key**
- Message still delivered (server broadcasts)
- Receiver tries to decrypt with wrong key → FAIL

👉 This is expected in current architecture

---

# 🧠 Root Cause

- No user-to-user mapping
- No conversation isolation
- No key validation per message

---

# 🚧 Next Phase (PHASE 4)

- 👥 Client A ↔ Client B identity mapping
- 🎯 Direct messaging (no broadcast)
- 🔐 Correct sender/receiver key pairing
- 📱 QR-based key exchange
- 🧠 Session-based encryption upgrade

---

# 🧪 How to run locally

## 1. Install

```bash
npm install
2. Start frontend
npm run dev
3. Start server
cd server
node server.js
4. Open browser
http://localhost:5174
⚠️ Disclaimer

This project is for educational purposes only.

It demonstrates E2EE concepts but is NOT production-ready secure messaging.

👨‍💻 Author

Built as a learning project exploring:

Cryptography fundamentals
Secure messaging systems
Real-time architectures
Signal-like E2EE design