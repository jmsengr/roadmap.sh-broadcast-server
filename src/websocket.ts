import type { ServerToClientEvents, ClientToServerEvents } from "./interface/websocket.js";
import { Server } from "socket.io";
import { io, Socket } from "socket.io-client";
import type http from "http";

const initWebSocketHandshake = (httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>) => {
	const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer);

	// Socket Connections
	io.on("connection", (socket) => {
		socket.emit("serverMsg", {
			msg: `Welcome! your socket id is ${socket.id}`,
			room: socket.id,
		});

		// Recieve message from client
		socket.on("clientMsg", (payload) => {});

		// Broadcast message to all clients
		io.emit("serverMsg", {
			msg: `Client counts ${io.engine.clientsCount}`,
			room: socket.id,
		});
	});
};

// CLIENT SIDE
let clientSocket: Socket<ServerToClientEvents, ClientToServerEvents> | null;

const connectSocket = () => {
	if (clientSocket?.connected) {
		console.log("Already connected");
		return;
	}

	clientSocket = io("http://localhost:3000");

	clientSocket.on("connect", () => {
		console.log("Connected to server!");
	});
};

const disconnectSocket = () => {
	if (clientSocket && clientSocket.connected) {
		clientSocket.disconnect();
		clientSocket = null;
		console.log("Disconnected from server");
	} else {
		console.log("No active socket connection");
	}
};

export { initWebSocketHandshake, connectSocket, disconnectSocket };
