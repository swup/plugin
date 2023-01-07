import { exec, echo } from '../lib/shell.js';

export default async function build() {
  echo('Bundling plugin with microbundle');

  exec('microbundle -f modern,esm,cjs');
  exec('microbundle -f umd --external none');
  return true;
};
