import { exec, echo } from '../lib/shell.js';

export default async function lint() {
	echo('Linting plugin with prettier');
	exec('prettier src/**/*.js --write');
	return true;
};