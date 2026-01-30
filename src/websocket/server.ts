import { Server } from "socket.io";
import type http from "http";
import { WS_EVENTS } from "./events.js";
import type { ClientToServerEvents, ServerToClientEvents } from "./types.js";

export const initWebSocketServer = (httpServer: http.Server) => {
    const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer);

    io.on("connection", (socket) => {
        socket.emit(WS_EVENTS.SERVER_MSG, {
            msg: `Welcome! your socket id is ${socket.id}`,
            room: socket.id,
        });

        socket.on(WS_EVENTS.CLIENT_MSG, (payload) => {
            socket.broadcast.emit(WS_EVENTS.SERVER_MSG, {
                msg: `Message from ${payload.room}: ${payload.msg}`,
                room: payload.room,
            });
        });

        socket.on("disconnect", () => {
            io.emit(WS_EVENTS.SERVER_MSG, {
                msg: `Client ${socket.id} disconnected`,
                room: socket.id,
            });
        });
    });

    return io;
};
