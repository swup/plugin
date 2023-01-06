import shell from 'shelljs';

export function cwd() {
	return process.cwd();
}

export function pwd() {
	return shell.pwd().toString();
}

export function exec(command) {
	return shell.exec(command);
}

export function echo(message) {
	shell.echo(`[swup] ${message}`);
}

export function error(message) {
	if (Array.isArray(message)) {
		message.forEach(msg => error(msg));
	} else {
		echo(`Error: ${message}`);
	}
	shell.exit(1);
}
