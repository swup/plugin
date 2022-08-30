#!/usr/bin/env node

import shell from 'shelljs';

shell.echo('[swup] Bundling plugin');

shell.exec('microbundle -f modern,esm,cjs && microbundle -f umd --external none');
