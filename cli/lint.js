#!/usr/bin/env node

import shell from 'shelljs';

shell.echo('[swup] Linting plugin');

shell.exec('prettier src/**/*.{js,mjs} --write');
