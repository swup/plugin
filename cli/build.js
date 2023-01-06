#!/usr/bin/env node

import { exec, echo } from './shell.js';

export default async function build() {
  echo('Bundling plugin with microbundle');
  exec('microbundle -f modern,esm,cjs && microbundle -f umd --external none');
  return true;
};
