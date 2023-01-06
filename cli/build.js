#!/usr/bin/env node

import { exec, echo } from './shell.js';

export default function build() {
  echo('Bundling plugin...');
  exec('microbundle -f modern,esm,cjs && microbundle -f umd --external none');
  return true;
};
