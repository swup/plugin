import shell from 'shelljs';
import live from 'shelljs-live';
import chalk from 'chalk';

export function exec(command) {
	return live(command);
	// return shell.exec(command);
}

export function echo(message) {
	console.log(chalk.gray('[swup]'), message);
}

export function error(message) {
	if (Array.isArray(message)) {
		message.forEach(msg => error(msg));
	} else {
		console.log(chalk.red.bold(message));
	}
	shell.exit(1);
}
