# Swup Base Plugin

Base class for creating swup plugins.

## Creating a Plugin

To create a new plugin, use the official [swup plugin template](https://github.com/swup/plugin-template). It comes with detailed instructions and the required tooling.

## Usage

```js
import Plugin from '@swup/plugin';

export default class PluginName extends Plugin {
  name = 'PluginName';
  mount() {}
  unmount() {}
}
```

## Commands

The base plugin installs npm commands to help with bundling and linting plugin code.

### Bundling

Bundle the plugin for production using [microbundle](https://github.com/developit/microbundle), creating ESM and UMD builds.

```bash
swup-plugin-bundle
```

### Linting

Lint the plugin code using [prettier](https://prettier.io/) and swup's recommended rules.

```bash
swup-plugin-lint
```
