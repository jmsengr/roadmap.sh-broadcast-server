import express, { Request, Response, NextFunction } from "express";

// ---- HELPERS ---- //

// server
import { disconnectHttpServer } from "./server.js";
import { disconnectWebSocket } from "./websocket.js";
import { syncTimer } from "./helpers/countDown.js";
import isPortTaken from "./helpers/portChecker.js";

// dirname & filename
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// NPM Packages
import cors from "cors";
import cookieParser from "cookie-parser";

// Interface
import HttpError from "./interface/httpError.js";
import kleur from "kleur";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ----- ROUTES ----- //
app.get("/test", async (req: Request, res: Response, next: NextFunction) => {
    res.json({ success: true, data: "TEST MESSAGE" });
});

// Global Error Handler
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    const status = err.statusCode || 500;
    res.status(status).json({
        success: false,
        message: err.message || "Something went wrong",
        data: err.data || null,
    });
});

// Graceful Shutdown Handler
const gracefulShutdown = async () => {
    console.log("");
    console.log(kleur.red("[GRACEFUL SHUTDOWN]"));

    await disconnectWebSocket(); // Disconnect WebSocket Clients
    await disconnectHttpServer(); // Disconnect HTTP Server

    process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);

export default app;
