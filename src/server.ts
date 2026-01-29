import http from "http";
import app from "./app.js";
import kleur from "kleur";
import { initWebSocketHandshake } from "./websocket.js";

const PORT = process.env.PORT || 3000;

let httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

const startServer = () => {
	try {
		// Initialize Server
		httpServer = http.createServer(app);

		initWebSocketHandshake(httpServer);
		console.log(kleur.yellow("Web Socket Upgraded"));

		httpServer.listen(PORT, () => {
			console.log(kleur.white("Server running on port " + PORT));
		});

		// Graceful Shutdown
		process.on("SIGTERM", () => {
			console.log("SIGTERM received, closing server...");
			httpServer.close(() => console.log("Server closed"));
		});
	} catch (err) {
		console.error("Failed to start server:", err);
		process.exit(1);
	}
};

const getServer = () => {
	return httpServer;
};

export { startServer, getServer };
