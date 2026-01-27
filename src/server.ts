import http from "http";
import app from "./app.js";
import prisma from "./database/prisma.js";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Prisma connected to the database");

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });

    process.on("SIGTERM", () => {
      console.log("SIGTERM received, closing server...");
      server.close(() => console.log("Server closed"));
    });

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
