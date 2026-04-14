# E2EE Chat (Phase 2 - MVP)

This is a real-time multi-user chat prototype built with WebSocket and React.

---

## 🚀 What This Project Does

This phase implements a **working chat system prototype** with:

- Multiple users (A, B, C, D test environment)
- Real-time messaging via WebSocket
- Conversation-based chat UI
- Persistent chat grouping per user pair

---

## 🧠 Why This Architecture Exists

Earlier version had:
- global message broadcast
- no conversation separation
- no active chat selection

This caused:
- mixed messages between users
- no proper chat UX
- impossible scaling toward rooms or DB

---

## 🔧 What Changed in Phase 2

### 1. Conversation-based model
Messages are now grouped by:

A-B, B-C, C-D ...


This simulates real chat apps like WhatsApp.

---

### 2. Active chat system
Users now:
- select a person from user list
- open a dedicated chat window
- see only that conversation

---

### 3. UI separation

- Users panel → who exists
- Chats panel → active conversations
- Message window → current chat only

---

### 4. Real-time messaging fix
Messages are now:
- routed per user
- stored per conversation
- displayed only in correct context

---

## 📦 Current Limitations

- No authentication
- No database persistence
- No encryption enforcement in UI layer yet (E2EE will be re-integrated later)
- Users are static (A, B, C, D only)

---

## 🔮 Next Steps (Phase 3)

Planned upgrades:

- 🔐 real E2EE integration (session-based keys)
- 🧾 persistent storage (DB or IndexedDB)
- 👥 group chat / room system
- 🔎 dynamic user system (@username, email)
- 🟢 online/offline presence
- ⚡ message sync across sessions

---

## 🧪 Current Test Flow

1. Open app in multiple tabs
2. Login as different users (A/B/C/D)
3. Select a user from left panel
4. Send message
5. Observe real-time sync between clients