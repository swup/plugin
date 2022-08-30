#!/usr/bin/env node

import { echo, error } from './cli.js';
import pkg from '../package.json';

echo('Bundling plugin...');

const errors = [];

if (!pkg.amdName) {
  errors.push('package.json missing `amdName` property');
}
if (pkg.type !== 'module') {
  errors.push('package.json `type` property must be "module"');
}
if (!pkg.source) {
  errors.push('package.json missing `source` property');
}
if (!pkg.main) {
  errors.push('package.json missing `main` property');
}
if (!pkg.module) {
  errors.push('package.json missing `module` property');
}
if (!pkg.unpkg) {
  errors.push('package.json missing `unpkg` property');
}
if (!pkg.exports) {
  errors.push('package.json missing `exports` property');
}

if (errors.length) {
  shell.exec('microbundle -f modern,esm,cjs && microbundle -f umd --external none');
} else {
  error('microbundle -f modern,esm,cjs && microbundle -f umd --external none');
}
