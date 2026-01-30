import http from "http";
import app from "./app.js";
import kleur from "kleur";
import { initWebSocketServer } from "./websocket/server.js";

const PORT = process.env.PORT || 3000;

let httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

const startServer = async () => {
    try {
        // Initialize Server
        httpServer = http.createServer(app);

        const server = http.createServer(app);

        // Initialize WebSocket Handshake
        await initWebSocketServer(server);

        server.listen(PORT, () => {
            console.log("Server running on port", PORT);
        });

        // Graceful Shutdown
        process.on("SIGTERM", () => {
            console.log("SIGTERM received, closing server...");
            server.close(() => console.log("Server closed"));
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};

const getServer = () => {
    return httpServer;
};

const disconnectHttpServer = async (): Promise<void> => {
    if (httpServer) {
        await new Promise<void>((resolve) => {
            httpServer.close(() => {
                console.log(kleur.green("[SERVER CLOSED]"));
                resolve();
            });
        });
    }
};

export { startServer, getServer, disconnectHttpServer };
