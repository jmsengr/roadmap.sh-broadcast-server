# Broadcast Server

https://roadmap.sh/projects/broadcast-server

A simple CLI-based broadcast server that allows multiple clients to connect and send messages in real-time. Messages sent by any client are broadcasted to all connected clients. This project demonstrates the use of WebSockets for real-time communication, similar to chat applications or live scoreboards.

---

## Features

- Start a server or connect as a client via CLI commands.
- Broadcast messages to all connected clients in real-time.
- Handle multiple client connections and disconnections gracefully.
- Error handling and graceful server shutdown.

---

## CLI Commands

```bash
# Start the server
broadcast-server start

# Connect a client to the server
broadcast-server connect
```

---

# Getting Started

Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Optional: TypeScript for running a TS-based implementation

Installation

1. Clone the repository:

```bash
git clone <repository_url>
cd broadcast-server
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

---

# Usage

Start the Server

```bash
npx broadcast-server start
```

The server will start listening on the configured port (default: 3000).

Connect as a Client

To emulate a client/user open another terminal that points to project, then run the command

```bash
npx broadcast-server connect
```

You should see:

```bash
 Connected to websocket server
[SERVER]: Welcome! your socket id is j1MwJ0-xBR0czaF-AAAB
Type 'exit' to quit the program.
>
```

---

# Implementation Details

1. Server listens for incoming client connections.
2. Maintains a list of all connected clients.
3. Broadcasts messages received from any client to all other connected clients.
4. Handles client disconnections gracefully.
5. Provides basic error handling and clean shutdown.

---

# Tech Stack

- Node.js / Express (for CLI handling, optional)
- WebSockets (Socket.IO) (for real-time communication)
- TypeScript (optional, for type safety)

---

# Extending the Project

- Add authentication for clients.
- Maintain message history for late-joining clients.
- Implement private messaging or channels.
- Deploy as a cloud-based real-time server.
