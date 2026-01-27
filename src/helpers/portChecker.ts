/*
    When you start an HTTP server, it binds to a port (e.g., 3000).
    If the port is already in use, the server cannot start.
*/

import net from "net";

// Callback takes a boolean indicating if the port is already in use
export function isPortTaken(port: number, callback: (taken: boolean) => void): void {
    const tester = net
        .createServer()
        .once("error", (err: NodeJS.ErrnoException) => {
            // err.code is 'EADDRINUSE' if the port is in use
            callback(err.code === "EADDRINUSE");
        })
        .once("listening", () => {
            tester.close();
            callback(false); // port is free
        })
        .listen(port);
}
