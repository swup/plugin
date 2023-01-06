import { exec, echo } from './shell.js';

export default async function lint() {
  echo('Linting plugin with prettier');
  exec('prettier src/**/*.{js,mjs} --write');
  return true;
};
