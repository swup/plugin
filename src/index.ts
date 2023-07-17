import type Swup from 'swup';
import type { Plugin } from 'swup';
import { checkDependencyVersion } from './pluginRequirements.js';

export default abstract class SwupPlugin implements Plugin {
	/** Name of the plugin */
	abstract name: string;

	/** Identify as a swup plugin */
	isSwupPlugin: true = true;


	// Swup instance, assigned by swup itself
	swup: Swup;
	/** Version of this plugin. Currently not in use, defined here for backward compatiblity. */
	version?: string;

	/** Version requirements of this plugin. Example: `{ swup: '>=4' }` */
	requires?: Record<string, string | string[]> = {};

	/** Run on mount */
	mount() {
		// this is mount method rewritten by class extending
		// and is executed when swup is enabled with plugin
	}

	/** Run on unmount */
	unmount() {
		// this is unmount method rewritten by class extending
		// and is executed when swup with plugin is disabled
	}

	_beforeMount(): void {
		if (!this.name) {
			throw new Error('You must define a name of plugin when creating a class.');
		}
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
