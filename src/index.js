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
		if (typeof this.requires === 'object' && typeof checkVersion === 'function') {
			return checkVersion(this.swup, this.requires);
		} else {
			return true;
		}
	}
}
