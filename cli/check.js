#!/usr/bin/env node

import path from 'path';
import { echo, error, pwd } from './shell.js';

// Import package.json relative to pwd, i.e. the plugin directory

// import pkg from '../package.json' assert { type: "json" };

// import path from 'path';
// import pkg from path.resolve(pwd(), 'package.json');

// import { createRequire } from 'module';
// import { pathToFileURL } from 'url';

// const require = createRequire(import.meta.url);

// await import(pathToFileURL(require.resolve(pwd(), 'package.json')));

export default function check() {
  const pkg = require(path.resolve(pwd(), 'package.json'));
  console.log(pkg);

  echo(`Checking plugin package info of "${pkg.name}"...`);

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
    error(errors);
    return false;
  } else {
    echo('package.json looking good');
    return true;
  }
};
