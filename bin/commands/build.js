import { exec, echo } from '../lib/shell.js';

export default async function build() {
	echo('Bundling plugin with microbundle');
	exec('BROWSERSLIST_ENV=modern microbundle -f modern,esm,cjs');
	exec('BROWSERSLIST_ENV=production microbundle -f umd --external none');
	return true;
};
