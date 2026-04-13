# 🔐 E2EE Chat Application (Phase 1 - Broadcast Baseline)

## 📌 Overview

This project is a real-time encrypted chat system built using:

- WebSocket (real-time transport layer)
- TweetNaCl (public-key encryption)
- React (frontend UI)
- Node.js (backend relay server)

This current version represents **Phase 1: Broadcast Chat Foundation**.

---

## 🧠 Why this project exists

The goal is to build a **Signal-like end-to-end encrypted messaging system** step by step.

This phase focuses on:

- establishing real-time communication
- implementing cryptographic identity
- validating encrypted message flow between multiple clients

---

## ⚙️ Current Features

### 💬 Messaging
- real-time WebSocket messaging
- broadcast-based message delivery
- basic chat UI with input + message list

### 🔐 Cryptography (E2EE foundation)
- nacl.box encryption/decryption
- per-user keypair generation
- localStorage persistence
- nonce-based encryption

### 👤 Identity
- simple user system (A, B, C, D)
- fingerprint generation from public key
- manual peer key handling (temporary dev solution)

---

## 📺 Example Flow (Current System)

1. User A logs in
2. User B logs in in another browser
3. Both generate keypairs
4. Messages are sent via WebSocket broadcast
5. Each client attempts decryption locally
6. Messages appear in UI (if decrypt succeeds)

---

## 🖥️ Current UI Behavior

- All users see all messages (broadcast mode)
- No private rooms yet
- Chat selection is UI-only (not backend isolated)
- Messages are labeled by sender only

---

## ⚠️ Known Limitations

- No direct message routing (all messages are broadcast)
- No authentication system
- No chat rooms or conversations
- No server-side encryption awareness
- Manual peer key exchange required

---

## 🚀 Next Phase Goals (Phase 2)

- implement true DM system (A ↔ B isolation)
- introduce conversation state management
- build room-based routing on server
- separate chat threads per user
- prepare structure for group chats

---

## 🧭 Long-term Vision

- secure multi-user messaging platform
- group chats with E2EE
- QR-based key exchange
- authentication + user accounts
- Signal-style session encryption model

---

## 🧪 Tech Stack

- React
- Node.js
- ws (WebSocket)
- tweetnacl