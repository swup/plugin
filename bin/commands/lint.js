import { exec, echo } from '../lib/shell.js';

export default async function lint() {
	echo('Linting with prettier');
	exec('prettier src/**/*.js --check');
	return true;
};
