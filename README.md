information: An LLM helped me with the README file.

# E2EE Chat Engine

A realtime messaging engine prototype built with React, WebSocket and a protocol-oriented architecture designed for long-term scalability.

This project is not a simple “chat app UI”.

It is an attempt to build a production-oriented realtime messaging foundation that can evolve toward:

- end-to-end encryption
- offline synchronization
- mobile compatibility
- persistent storage
- scalable conversation systems
- event-driven networking

The focus of the project is architecture, deterministic message flow and future-proof system design.

---

# Project Vision

Most beginner realtime chat projects become difficult to maintain after adding:

- delivery receipts
- read receipts
- reconnect logic
- offline handling
- persistence
- multiple devices
- encryption
- media transfer
- mobile support

The reason is usually tight coupling between:

- UI
- socket logic
- message state
- protocol logic
- transport logic

This project intentionally separates these concerns from the beginning.

The goal is building a messaging engine that can gradually evolve into a Signal/Telegram/WhatsApp-style architecture without requiring large rewrites later.

---

# Current Features

## Realtime Messaging

- realtime user-to-user WebSocket communication
- direct socket routing
- isolated conversation system
- optimistic UI updates

---

## Structured Message Lifecycle

Messages support deterministic lifecycle transitions:

```txt
PENDING → SENT → DELIVERED → READ
```

Each message tracks:

- sentAt
- deliveredAt
- readAt

This enables:

- realtime receipts
- synchronization
- future persistence
- analytics/debugging

---

## Conversation-based Architecture

Conversations are uniquely generated using:

```js
[a, b].sort().join("-")
```

Examples:

```txt
A-B
A-C
B-D
```

Benefits:

- deterministic conversation IDs
- no duplicate conversations
- stable grouping
- database compatibility

---

## Normalized-ish State Structure

Instead of a single global messages array:

```js
conversations = {
  "A-B": {
    messagesById: {},
    messageOrder: []
  }
}
```

Benefits:

- easier updates
- deterministic rendering
- scalable state management
- simpler sync logic

---

## Runtime Separation

The architecture separates:

- protocol layer
- transport layer
- runtime engine
- UI feature layer

This keeps business logic outside React UI components.

Benefits:

- easier testing
- easier debugging
- mobile portability
- lower coupling

---

## Mobile-ready Foundation

The project structure is intentionally designed to support future migration toward:

- React Native
- Expo
- Electron

The protocol and runtime layers are mostly platform-independent.

---

# Folder Structure

```txt
src/
│
├── app/                  # app bootstrap
│
├── core/                 # platform-independent core logic
│   ├── constants/
│   └── protocol/
│
├── network/              # socket/network implementations
│   └── socket/
│
├── runtime/              # realtime engine/runtime logic
│   ├── engine/
│   └── store/
│
├── features/             # UI feature layer
│   ├── chat/
│   └── user/
│
├── shared/               # shared utilities/hooks
│
└── server/               # websocket relay server
```

---

# Why This Structure Exists

This structure was intentionally chosen to avoid future architectural collapse.

Typical small chat projects often mix:

- websocket code
- UI state
- business rules
- lifecycle logic
- rendering logic

inside React components.

That becomes extremely difficult to scale once features like:

- retries
- reconnects
- persistence
- encryption
- media uploads
- multi-device sync

are introduced.

This project avoids that problem early by separating responsibilities.

---

# Architectural Principles

## 1. Protocol-first Design

The protocol layer defines:

- events
- message schema
- conversation rules
- lifecycle contracts

This makes the messaging system deterministic and portable.

---

## 2. Stateless Relay Server

Current server behavior:

```txt
stateless websocket relay
```

The server currently handles:

- socket registration
- direct routing
- lifecycle acknowledgements

The server does NOT yet handle:

- authentication
- persistence
- queues
- sync
- encryption

This is intentional.

The messaging engine is stabilized before introducing backend complexity.

---

## 3. Event-driven Messaging

The system communicates through structured events:

```txt
REGISTER
SEND_MESSAGE
SERVER_ACK
DELIVERED_ACK
READ_MESSAGE
READ_ACK
```

This prepares the architecture for future:

- retries
- queues
- deduplication
- sync engines
- encryption transport

---

## 4. Future E2EE Compatibility

The structure intentionally preserves boundaries required for future E2EE implementation.

Especially:

```txt
core/protocol
network/
runtime/
```

These layers will later host:

- encryption
- key exchange
- transport encryption
- message versioning
- secure session logic

---

# Current Technical Goals

The current focus is stabilizing:

- deterministic message flow
- socket lifecycle
- realtime synchronization
- conversation isolation
- event consistency

before introducing persistence and authentication.

---

# Planned Next Steps

## Authentication System

- real user accounts
- JWT/session handling
- secure identity layer

---

## Presence System

- online/offline tracking
- typing indicators
- last seen

---

## Reliable Transport Layer

- retry queues
- ACK tracking
- reconnect strategy
- exponential backoff
- offline delivery

---

## Persistence Layer

- MongoDB/PostgreSQL
- message storage
- conversation storage
- sync engine

---

## Group Messaging

- rooms/groups
- admin roles
- permissions
- mentions

---

## Media System

- image messages
- video messages
- file transfer
- upload transport

---

## End-to-End Encryption

Long-term goal:

- Signal-style encrypted messaging
- session keys
- encrypted payload transport
- zero-knowledge relay server

---

# Current State of the Project

This is currently:

```txt
Realtime Messaging Engine Prototype
```

NOT:

- a finished messenger
- a polished product
- a complete backend system

The focus is building a clean and scalable messaging core before adding product-level complexity.

---

# Running the Project

## Install dependencies

```bash
npm install
```

---

## Start websocket server

```bash
node server/server.js
```

---

## Start Vite client

```bash
npm run dev
```

---

# Testing

1. Open multiple browser tabs
2. Login as different users
3. Open conversations
4. Send messages
5. Observe:

- realtime delivery
- read receipts
- lifecycle transitions
- conversation sorting

---

# Long-term Goal

The long-term goal is building a serious realtime messaging architecture capable of evolving toward:

- secure messaging
- scalable sync systems
- mobile clients
- persistent infrastructure
- production-grade realtime communication