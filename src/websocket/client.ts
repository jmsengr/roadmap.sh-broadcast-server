import { io, Socket } from "socket.io-client";
import kleur from "kleur";
import { WS_EVENTS } from "./events.js";
import type { ServerToClientEvents, ClientToServerEvents } from "./types.js";

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const connectWebSocket = async () => {
    return new Promise<void>((resolve) => {
        if (socket?.connected) {
            console.log("Already connected");
            return resolve();
        }

        socket = io("http://localhost:3000");

        socket.on("connect", () => {
            console.log(kleur.green("Connected to websocket server"));
        });

        socket.on(WS_EVENTS.SERVER_MSG, (payload) => {
            console.log(kleur.cyan(`[SERVER]: ${payload.msg}`));
        });

        return resolve();
    });
};

export const disconnectWebSocket = async (): Promise<void> => {
    if (!socket || !socket.connected) return;

    return new Promise((resolve) => {
        socket!.once("disconnect", () => {
            console.log(kleur.green("[WEB SOCKET DISCONNECTED]"));
            socket = null;
            resolve();
        });

        socket!.disconnect();
    });
};

export const sendMessage = (msg: string) => {
    if (!socket?.connected) {
        console.log(kleur.red("Not connected to server"));
        return;
    }

    socket.emit(WS_EVENTS.CLIENT_MSG, { msg, room: socket.id as string });
};
