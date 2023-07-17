import type Swup from 'swup';
import type { Plugin as PluginType } from 'swup';
import { checkDependencyVersion } from './pluginRequirements.js';

export type { PluginType };

// omitting name as we don't want to define it here,
// it must be defined in the extended class of the plugin
// and so the type will say the same when omitting here
// and forces the plugin author to define name on their side
export default abstract class Plugin implements PluginType {
	abstract name: string;

	// Identify as swup plugin created by extending this class
	isSwupPlugin = true as const;

	// Specify the version of swup that is required to use this plugin
	// e.g. requires = { swup: '>=3.0' }
	requires = {};

	// Swup instance, assigned by swup itself
	swup: Swup;

	// Version, not in use
	version: string | undefined;

	mount() {
		// this is mount method rewritten by class extending
		// and is executed when swup is enabled with plugin
	}

	unmount() {
		// this is unmount method rewritten by class extending
		// and is executed when swup with plugin is disabled
	}

	_beforeMount() {
		// @ts-ignore name is always defined by extending the Plugin class
		if (!this.name) {
			throw new Error('You must define a name of plugin when creating a class.');
		}
	}

	_afterUnmount() {
		// here for any future hidden auto-cleanup
	}

	_checkRequirements() {
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
