#!/usr/bin/env node

import build from './build.js';
import check from './check.js';
import lint from './lint.js';

const commands = {
	check,
	lint,
	build: async () => (await check()) && (await build()),
};

async function main() {
	const args = process.argv.slice(2);

	const command = args[0] || '';
	if (!command) {
		throw new Error(`Missing command (available: ${Object.keys(commands).join(', ')}`);
	}

	const handler = commands[command];
	if (!handler) {
		throw new Error(`Unknown command: ${args.join(' ')}`);
	}

	await handler(args);
}

main();
