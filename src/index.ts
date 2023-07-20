import Swup from 'swup';
import type { Plugin as PluginType, HookName, HookOptions, Handler } from 'swup';
import { checkDependencyVersion } from './pluginRequirements.js';

type HookUnregister = () => void;

export type { PluginType };

// omitting name as we don't want to define it here,
// it must be defined in the extended class of the plugin
// and so the type will say the same when omitting here
// and forces the plugin author to define name on their side
export default class Plugin implements Omit<PluginType, 'name'> {
	// Identify as swup plugin created by extending this class
	isSwupPlugin = true as const;

	// Specify the version of swup that is required to use this plugin
	// e.g. requires = { swup: '>=3.0' }
	requires = {};

	// Swup instance, assigned by swup itself
	swup: Swup;

	// Version, not in use
	version: string | undefined;

	// List of hook handlers to unregister on unmount
	private handlersToUnregister: HookUnregister[] = [];

	mount() {
		// this is mount method rewritten by class extending
		// and is executed when swup is enabled with plugin
	}

	unmount() {
		// this is unmount method rewritten by class extending
		// and is executed when swup with plugin is disabled

		// Unsubscribe all registered hook handlers
		this.handlersToUnregister.forEach((unregister) => unregister());
		this.handlersToUnregister = [];
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
				// @ts-ignore name is always defined by extending the Plugin class
				throw new Error(`Plugin version mismatch: ${this.name} requires ${requirement}`);
			}
		});

		return true;
	}

	/**
	 * Register a new hook handler. Automatically unsubscribed on unmount.
	 * @see swup.hooks.on
	 */
	protected on<T extends HookName>(hook: T, handler: Handler<T>, options: HookOptions = {}): HookUnregister {
		const unregister = this.swup.hooks.on(hook, handler, options);
		this.handlersToUnregister.push(unregister);
		return unregister;
	}

	protected once<T extends HookName>(hook: T, handler: Handler<T>, options: HookOptions = {}): HookUnregister {
		return this.on(hook, handler, { ...options, once: true });
	}

	protected before<T extends HookName>(hook: T, handler: Handler<T>, options: HookOptions = {}): HookUnregister {
		return this.on(hook, handler, { ...options, before: true });
	}

	protected replace<T extends HookName>(hook: T, handler: Handler<T>, options: HookOptions = {}): HookUnregister {
		return this.on(hook, handler, { ...options, replace: true });
	}

	protected off<T extends HookName>(hook: T, handler?: Handler<T>): void {
		return this.swup.hooks.off(hook, handler!);
	}
}
