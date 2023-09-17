import type Swup from 'swup';
import type { Plugin, HookName, HookOptions, HookUnregister, Handler } from 'swup';
import { checkDependencyVersion } from './pluginRequirements.js';

function isBound(func: Function) {
	return func.name.startsWith('bound ') && !func.hasOwnProperty('prototype');
}

export default abstract class SwupPlugin implements Plugin {
	/** Name of the plugin */
	abstract name: string;

	/** Identify as a swup plugin */
	isSwupPlugin: true = true;

	// Swup instance, assigned by swup itself
	swup!: Swup;

	/** Version of this plugin. Currently not in use, defined here for backward compatiblity. */
	version?: string;

	/** Version requirements of this plugin. Example: `{ swup: '>=4' }` */
	requires?: Record<string, string | string[]> = {};

	// List of hook handlers to unregister on unmount
	private handlersToUnregister: HookUnregister[] = [];

	/** Run on mount */
	mount() {
		// this is mount method rewritten by class extending
		// and is executed when swup is enabled with plugin
	}

	/** Run on unmount */
	unmount() {
		// this is unmount method rewritten by class extending
		// and is executed when swup with plugin is disabled

		// Unsubscribe all registered hook handlers
		this.handlersToUnregister.forEach((unregister) => unregister());
		this.handlersToUnregister = [];
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

	/**
	 * Register a new hook handler.
	 *
	 * On plugin unmount, the handler will automatically be unregistered.
	 * The handler function is lexically bound to the plugin instance for convenience.
	 * @see swup.hooks.on
	 */
	protected on<T extends HookName>(hook: T, handler: Handler<T>, options: HookOptions = {}): HookUnregister {
		handler = !isBound(handler) ? handler.bind(this) : handler;
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
