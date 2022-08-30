#!/usr/bin/env node

import { exec, echo } from './cli.js';

echo('Linting plugin...');

exec('prettier src/**/*.{js,mjs} --write');
