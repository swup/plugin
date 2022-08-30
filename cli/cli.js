import shell from 'shelljs';

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
