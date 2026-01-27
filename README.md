# Broadcast Server

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
