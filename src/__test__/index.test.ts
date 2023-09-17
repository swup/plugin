import { describe, expect, it, vi } from 'vitest';

import Swup, { Handler, HookName } from 'swup';
import BasePlugin from '../index';

declare module 'swup' {
	export interface HookDefinitions {
		test: undefined;
	}
}

describe('hooks', () => {
	it('should register and unregister hooks', () => {
		const handler = vi.fn();
		const handlerOnce = vi.fn();
		const handlerReplace = vi.fn();
		const defaultHandler = vi.fn();

		class Plugin extends BasePlugin {
			name = 'TestPlugin';
			mount() {
				this.on('test', handler);
				this.once('test', handlerOnce);

				this.swup.hooks.callSync('test', undefined, defaultHandler);

				this.replace('test', handlerReplace);

				this.swup.hooks.callSync('test', undefined, defaultHandler);
			}
			unmount() {
				super.unmount();
				this.swup.hooks.callSync('test');
				this.swup.hooks.callSync('test');
			}
		}

		const swup = new Swup();
		swup.hooks.create('test');
		const plugin = new Plugin();
		swup.use(plugin);
		swup.unuse(plugin);
		expect(handler).toHaveBeenCalledTimes(2);
		expect(handlerOnce).toHaveBeenCalledTimes(1);
		expect(handlerReplace).toHaveBeenCalledTimes(1);
		expect(defaultHandler).toHaveBeenCalledTimes(1);
	});

	it('should bind hook handlers to plugin instance', () => {
		let thisArgUnbound: any;
		let thisArgBound: any;
		let thisArgArrow: any;

		const otherThis = {};

		class Plugin extends BasePlugin {
			name = 'TestPlugin';
			mount() {
				this.on('test', this.unbound);
				this.on('test', this.bound.bind(otherThis));
				this.on('test', this.arrow);
				this.swup.hooks.callSync('test');
			}
			unbound() {
				thisArgUnbound = this;
			}
			bound() {
				thisArgBound = this;
			}
			arrow = () => {
				thisArgArrow = this;
			};
		}

		const swup = new Swup();
		swup.hooks.create('test');
		const plugin = new Plugin();
		swup.use(plugin);
		expect(thisArgUnbound).toBe(plugin);
		expect(thisArgBound).toBe(otherThis);
		expect(thisArgArrow).toBe(plugin);
	});
});
