import { describe, expect, it, vi } from 'vitest';

import Swup, { Handler, HookName } from 'swup';
import BasePlugin from '../index';

declare module 'swup' {
	export interface HookDefinitions {
		test: undefined;
	}
}

const swup = new Swup();
swup.hooks.create('test'	as any);

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

				this.swup.hooks.callSync('test' as any, undefined, defaultHandler);

				this.replace('test', handlerReplace);

				this.swup.hooks.callSync('test' as any, undefined, defaultHandler);
			}
			unmount() {
				super.unmount();
				this.swup.hooks.callSync('test' as any);
				this.swup.hooks.callSync('test' as any);
			}
		}

		const plugin = new Plugin();
		swup.use(plugin);
		swup.unuse(plugin);
		expect(handler).toHaveBeenCalledTimes(2);
		expect(handlerOnce).toHaveBeenCalledTimes(1);
		expect(handlerReplace).toHaveBeenCalledTimes(1);
		expect(defaultHandler).toHaveBeenCalledTimes(1);
	});
});
