# E2EE Chat (Phase 3 - Chat Engine)

This is a real-time multi-user chat prototype built with WebSocket and React.

---

# 🚀 What This Project Does

This phase upgrades the application into a more complete realtime chat engine with:

* Multiple users (A, B, C, D test environment)
* Direct user-to-user WebSocket messaging
* Conversation-based chat system
* Optimistic UI updates
* Realtime delivery & read receipts
* Conversation sorting by recent activity
* Structured message lifecycle tracking
* Scalable chat architecture

---

# 🧠 Why This Architecture Exists

Earlier versions had:

* global message handling
* unstable realtime synchronization
* inconsistent conversation rendering
* duplicated or missing messages
* weak message structure

This caused:

* messages not appearing reliably
* broken synchronization between clients
* difficult debugging
* impossible scaling toward persistence or E2EE
* poor foundation for future features

---

# 🔧 What Changed in Phase 3

## 1. Standardized Message Model

Messages now use a consistent structure:

```js
{
  id,
  type,
  from,
  to,
  content,
  timestamp,
  status,
  conversationId,
  deleted,
  sentAt,
  deliveredAt,
  readAt
}
```

This enables:

* message lifecycle tracking
* future database storage
* delivery acknowledgements
* read receipts
* duplicate prevention

---

## 2. Deterministic Conversation System

Each conversation is uniquely identified using:

```js
[from, to].sort().join("-")
```

Examples:

* A-B
* A-C
* B-D

This guarantees:

* consistent conversation IDs
* no duplicate chats
* stable message grouping

---

## 3. Conversation-based State Management

The application no longer uses a global message array.

Instead:

```js
conversations = {
  "A-B": {
    messages: [],
    lastMessageAt
  }
}
```

This enables:

* isolated chat state
* scalable architecture
* easier synchronization
* database-ready structure

---

## 4. Optimistic UI

Messages now appear instantly after sending:

```js
store.addMessage(message)
send(message)
```

This creates:

* instant visual feedback
* smoother UX
* modern chat behavior

---

## 5. Realtime Message Lifecycle

Messages now support realtime state transitions:

```txt
sent → delivered → read
```

The system tracks:

* when sender created the message
* when receiver received it
* when receiver opened/read the chat

---

## 6. Delivery & Read Receipts

The server now sends realtime events:

### Delivered

```js
{
  type: "delivered",
  messageId
}
```

### Read

```js
{
  type: "read",
  messageId
}
```

This enables synchronized lifecycle updates between users.

---

## 7. Lifecycle Timestamp Tracking

Every message now stores:

* sentAt
* deliveredAt
* readAt

The UI displays lifecycle timestamps in realtime.

Example:

```txt
sent: 12:15:22
delivered: 12:15:23
read: 12:15:30
```

---

## 8. Direct Socket Routing

Previous versions partially behaved like broadcasts.

Now messages are routed directly:

```js
clients.get(targetUser)
```

This fixes:

* incorrect message rendering
* duplicate updates
* cross-user message leaks

---

## 9. Chat Sorting by Recent Activity

Conversations are sorted using:

```js
lastMessageAt
```

Result:

* newest conversations appear on top
* more realistic messaging UX

---

## 10. Improved UI Architecture

Chat UI is now separated into dedicated components:

* ChatShell
* ConversationList
* ChatWindow
* MessageList
* ChatInput

This improves:

* maintainability
* scalability
* debugging
* feature expansion

---

# 🧪 Example Realtime Lifecycle

### Sender View

```txt
B: hey are you free tonight?
sent: 11:59:37
delivered: 11:59:37
read: 11:59:45
```

### Receiver View

```txt
B: hey are you free tonight?
delivered: 11:59:37
read: 11:59:45
```

Another example:

```txt
C: sure, what time?
sent: 12:00:09
delivered: 12:00:09
read: 12:00:14
```

---

# 📦 Current Limitations

Still missing:

* authentication system
* persistent database
* offline message sync
* online/offline presence
* last seen tracking
* group chats
* file/image messages
* contact system

Current server behavior:

👉 stateless realtime relay server

---

# 🔮 Planned Next Steps (Phase 4)

Planned upgrades:

* 👤 real authentication system
* 🟢 online/offline presence
* 🕓 last seen tracking
* 👥 group conversations
* 📩 offline message persistence
* 🔎 dynamic user discovery
* 🧾 MongoDB integration
* 🔐 stronger E2EE architecture

---

# 🧪 Current Test Flow

1. Open application in multiple tabs
2. Login as different users (A/B/C/D)
3. Open conversations
4. Send messages
5. Observe:

   * realtime updates
   * delivery receipts
   * read receipts
   * lifecycle timestamps
   * conversation sorting

---

# 🧠 Long-Term Vision

This project is evolving toward:

* 🔐 Signal-style E2EE architecture
* 🧾 persistent backend storage
* 👥 scalable room/group systems
* 📱 production-grade realtime messaging
* ⚡ modern event-driven chat engine

---

# ⚠️ Important Note

At this stage:

👉 focus is realtime chat engine architecture

NOT:

* polished UI
* authentication
* persistence layer

The primary goal is building a:

scalable, testable, realtime messaging core
