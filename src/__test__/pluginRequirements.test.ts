import { describe, expect, it } from 'vitest';

import Swup from 'swup';
import { checkDependencyVersion } from '../pluginRequirements';

const swup = new Swup();

describe('checkDependencyVersion', () => {
	it('should return a boolean', () => {
		expect(checkDependencyVersion('1.2.3', ['1'], swup)).toBeTypeOf('boolean');
	});
	it('should check swup version', () => {
		swup.version = '2.2.1';
		expect(checkDependencyVersion('swup', ['1'], swup)).toEqual(true);
		expect(checkDependencyVersion('swup', ['2'], swup)).toEqual(true);
		expect(checkDependencyVersion('swup', ['2.2'], swup)).toEqual(true);
		expect(checkDependencyVersion('swup', ['2.3'], swup)).toEqual(false);
		expect(checkDependencyVersion('swup', ['3'], swup)).toEqual(false);
		expect(checkDependencyVersion('swup', ['<2'], swup)).toEqual(false);
		expect(checkDependencyVersion('swup', ['<3'], swup)).toEqual(true);
	});
	it('should cancel on empty value', () => {
		swup.version = '';
		expect(checkDependencyVersion('swup', ['1'], swup)).toEqual(false);
	});
	it('should cancel on missing dependency', () => {
		swup.version = '2.2.1';
		expect(checkDependencyVersion('something', ['2'], swup)).toEqual(false);
	});
});
