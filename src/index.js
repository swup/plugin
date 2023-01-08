import checkVersion from './checkVersion.js';

export default class Plugin {
	// this is here so we can tell if plugin was created by extending this class
	isSwupPlugin = true;

	// Specify the version of swup that is required to use this plugin
	// e.g. requires = { swup: '>=3.0' }
	requires = {};

	mount() {
		// this is mount method rewritten by class extending
		// and is executed when swup is enabled with plugin
	}

	unmount() {
		// this is unmount method rewritten by class extending
		// and is executed when swup with plugin is disabled
	}

	_beforeMount() {
		// here for any future hidden auto init
	}

	_afterUnmount() {
		// here for any future hidden auto-cleanup
	}

	_checkVersion() {
		if (typeof this.requires !== 'object') {
			return false;
		}

		Object.entries(this.requires).forEach(([dependency, versions]) => {
			versions = Array.isArray(versions) ? versions : [versions];
			if (!checkVersion(dependency, versions, this.swup)) {
				const requirement = `${dependency} (${versions.join(', ')}`;
				throw new Error(`${this.name} requires ${requirement}`);
			}
		});

		return true;
	}
}
