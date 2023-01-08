import microbundle from 'microbundle';

import { exec, echo } from '../lib/shell.js';
import { resolve } from '../lib/helpers.js';

export default async function build() {
	echo('Bundling plugin with microbundle');

	// await microbundle({
	// 		cwd: resolve(),
	// 		// input: resolve('./src/index.js'),
	// 		// output: resolve('./dist/'),
	// 		formats: 'modern,esm,cjs',
	// });
	// await microbundle({
	// 		cwd: resolve(),
	// 		// input: resolve('./src/index.js'),
	// 		// output: resolve('./dist/'),
	// 		formats: 'umd',
	// 		external: 'none',
	// });
	exec('microbundle -f modern,esm,cjs');
	exec('microbundle -f umd --external none');
	return true;
};
