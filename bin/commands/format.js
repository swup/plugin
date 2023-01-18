import { exec, echo } from '../lib/shell.js';

export default async function format() {
	echo('Formatting with prettier');
	exec('prettier src/**/*.js --write');
	return true;
};
