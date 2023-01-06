import { exec, echo } from './shell.js';

export default function lint() {
  echo('Linting plugin...');
  exec('prettier src/**/*.{js,mjs} --write');
  return true;
};
