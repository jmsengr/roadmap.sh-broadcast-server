#!/usr/bin/env node

import kleur from "kleur";
import { isPortTaken } from "./helpers/portChecker.js";
import startServer from "./server.js";
import dotenv from "dotenv";

dotenv.config();

const flag: string[] = process.argv.slice(2);

if (!flag.length) {
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
			console.log(`Use ` + kleur.underline("connect") + ` to connect to the existing server.`);
			process.exit(1);
		} else {
			startServer();
		}
	});
}
