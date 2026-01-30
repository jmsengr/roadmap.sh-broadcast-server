#!/usr/bin/env node

import kleur from "kleur";
import isPortTaken from "./helpers/portChecker.js";
import { startServer, getServer } from "./server.js";
import dotenv from "dotenv";
import { connectWebSocket, disconnectWebSocket, sendMessage } from "./websocket/client.js";
import { createInterface } from "readline";

dotenv.config();

const flag: string[] = process.argv.slice(2);

if (!flag.length || flag.length === 0) {
    console.log(kleur.red("No flag provided"));
    console.log(kleur.underline("start") + " - Start the Broadcast Server");
    console.log(kleur.underline("connect") + " - Connect to an existing Broadcast Server");
} else if (flag.length > 1) {
    console.log(kleur.red("Only one flag is allowed at a time"));
    console.log(kleur.underline("start") + " - Start the Broadcast Server");
    console.log(kleur.underline("connect") + " - Connect to an existing Broadcast Server");
} else if (flag[0] !== "start" && flag[0] !== "connect") {
    console.log(kleur.red("Invalid flag provided"));
    console.log(kleur.underline("start") + " - Start the Broadcast Server");
    console.log(kleur.underline("connect") + " - Connect to an existing Broadcast Server");
} else if (flag[0] === "start") {
    isPortTaken(Number(process.env.PORT) || 3000, (taken: boolean) => {
        if (taken) {
            console.log(kleur.red(`Server is already running on port ${process.env.PORT || 3000}`));
            console.log(`Use ` + kleur.underline("--connect") + ` flag to connect to the existing server.`);
            process.exit(1);
        } else {
            startServer();
        }
    });
} else if (flag[0] === "connect") {
    isPortTaken(Number(process.env.PORT) || 3000, async (taken: boolean) => {
        if (taken) {
            await connectWebSocket();

            // Initialize Client CLI
            initClientCli();
        } else {
            console.log(kleur.red("Server is not running, make sure to start it first"));
            process.exit(1);
        }
    });
}

const initClientCli = () => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log("Type 'exit' to quit the program.");

    const prompt = () => {
        rl.question(">  ", async (input: string) => {
            if (input === "exit") {
                rl.close();
                disconnectWebSocket();
                console.log(kleur.red("Program Exit"));
                process.exit(1);
            }

            if (!input || input === "") {
                prompt();
                return;
            } else {
                sendMessage(input);
                prompt();
            }
        });
    };

    prompt();
};
