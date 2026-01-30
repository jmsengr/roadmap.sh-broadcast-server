import type { ServerToClientEvents, ClientToServerEvents } from "./interface/websocket.js";
import { Server } from "socket.io";
import { io, Socket } from "socket.io-client";
import type http from "http";
import kleur from "kleur";
import { syncTimer } from "./helpers/countDown.js";

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

const connectSocket = async () => {
    if (clientSocket?.connected) {
        console.log("Already connected");
        return;
    }

    clientSocket = io("http://localhost:3000");

    if (!clientSocket || clientSocket === null) {
        console.log(kleur.bgRed("Failed to connect to websocket server"));
        return;
    }

    console.log(kleur.green("Connected to websocket server"));
};

const disconnectWebSocket = async (): Promise<void> => {
    return new Promise((resolve) => {
        if (!clientSocket || !clientSocket.connected) {
            return resolve();
        }

        clientSocket.once("disconnect", () => {
            clientSocket = null;
            console.log(kleur.green("[WEB SOCKET DISCONNECTED]"));
            resolve();
        });

        clientSocket.disconnect();
    });
};

export { initWebSocketHandshake, connectSocket, disconnectWebSocket };
