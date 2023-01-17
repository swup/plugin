import { checkDependencyVersion } from './pluginRequirements';

export type Swup = {
	version: string;
	findPlugin: (name: string) => SwupPlugin | null;
};

export type SwupPlugin = {
	version?: string;
};

export default class Plugin {
	// Required for all plugins
	name: string = '';

	// Identify as swup plugin created by extending this class
	isSwupPlugin: boolean = true;

	// Specify the version of swup that is required to use this plugin
	// e.g. requires = { swup: '>=3.0' }
	requires: object = {};

	// Swup instance, assigned by swup itself
	swup: Swup = {};

	mount(): void {
		// this is mount method rewritten by class extending
		// and is executed when swup is enabled with plugin
	}

	unmount(): void {
		// this is unmount method rewritten by class extending
		// and is executed when swup with plugin is disabled
	}

	_beforeMount(): void {
		// here for any future hidden auto init
	}

	_afterUnmount(): void {
		// here for any future hidden auto-cleanup
	}

	_checkRequirements(): boolean {
		if (typeof this.requires !== 'object') {
			return true;
		}

		Object.entries(this.requires).forEach(([dependency, versions]) => {
			versions = Array.isArray(versions) ? versions : [versions];
			if (!checkDependencyVersion(dependency, versions, this.swup)) {
				const requirement = `${dependency} ${versions.join(', ')}`;
				throw new Error(`Plugin version mismatch: ${this.name} requires ${requirement}`);
			}
		});

		return true;
	}
}
