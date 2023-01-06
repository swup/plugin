#!/usr/bin/env node

import { echo, cwd, pwd } from './shell.js';

import build from './build.js';
import check from './check.js';
import lint from './lint.js';

const commands = {
	check,
	lint,
	build: () => check() && build(),
};

function main() {
	const args = process.argv.slice(2);
	const cmd = args[0];
	const command = commands[cmd];

	echo(`Plugin CLI called with '${args.join(' ')}'`);
	echo(`pwd = ${pwd()}`);
	echo(`cwd = ${cwd()}`);

	if (command) {
		command(args);
	} else {
		throw new Error(`Unknown command: ${args.join(' ')}`);
	}
}

main();
