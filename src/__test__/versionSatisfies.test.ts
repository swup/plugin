import { describe, expect, it } from 'vitest';

import { normalizeVersion, compareVersion, versionSatisfies } from '../versionSatisfies';

describe('normalizeVersion', () => {
	it('should return a string', () => {
		expect(normalizeVersion('1.2.3')).toBeTypeOf('string');
	});
	it('should handle empty values', () => {
		expect(normalizeVersion('')).toBeTypeOf('string');
		expect(normalizeVersion('')).toBe('0.0.0');
	});
	it('should fill to 3 segments', () => {
		expect(normalizeVersion('1')).toBe('1.0.0');
		expect(normalizeVersion('1.2')).toBe('1.2.0');
		expect(normalizeVersion('1.2.3')).toBe('1.2.3');
	});
	it('should limit to 3 segments', () => {
		expect(normalizeVersion('1.2.3.4')).toBe('1.2.3');
	});
	it('should keep segments in place', () => {
		expect(normalizeVersion('0.1')).toBe('0.1.0');
		expect(normalizeVersion('0.0.1')).toBe('0.0.1');
	});
	it('should handle empty segments', () => {
		expect(normalizeVersion('.')).toBe('0.0.0');
		expect(normalizeVersion('1.')).toBe('1.0.0');
		expect(normalizeVersion('1.2.')).toBe('1.2.0');
		expect(normalizeVersion('.1.2')).toBe('0.1.2');
		expect(normalizeVersion('.3.')).toBe('0.3.0');
	});
	it('should handle multi-number segments', () => {
		expect(normalizeVersion('1.222.333')).toBe('1.222.333');
		expect(normalizeVersion('1.111')).toBe('1.111.0');
		expect(normalizeVersion('222')).toBe('222.0.0');
	});
	it('should handle preids', () => {
		expect(normalizeVersion('1.2.3-alpha')).toBe('1.2.3');
		expect(normalizeVersion('1.2.3-rc.0')).toBe('1.2.3');
	});
});

describe('compareVersion', () => {
	it('should return a number', () => {
		expect(compareVersion('1.0.0', '1.0.1')).toBeTypeOf('number');
	});
	it('should correctly sort equal major', () => {
		expect(compareVersion('1.0.0', '1.0.0')).toBe(0);
		expect(compareVersion('1', '1.0.0')).toBe(0);
		expect(compareVersion('2.1.0', '2.1')).toBe(0);
		expect(compareVersion('.1', '0.1.0')).toBe(0);
		expect(compareVersion('2.0.0-rc.3', '2')).toBe(0);
	});
	it('should correctly sort equal minor', () => {
		expect(compareVersion('0.0.1', '0.0.1')).toBe(0);
		expect(compareVersion('.2.1', '0.2.1')).toBe(0);
	});
	it('should correctly sort equal patch', () => {
		expect(compareVersion('1.0.0', '1.0.0')).toBe(0);
		expect(compareVersion('0.0.1', '.0.1')).toBe(0);
		expect(compareVersion('2.0.2-rc.1', '2.0.2')).toBe(0);
	});
	it('should correctly sort major', () => {
		expect(compareVersion('2.0.0', '1.0.1')).toBe(1);
		expect(compareVersion('3.0', '4')).toBe(-1);
	});
	it('should correctly sort minor', () => {
		expect(compareVersion('1.1.0', '1.2.0')).toBe(-1);
		expect(compareVersion('3.1.0', '3')).toBe(1);
	});
	it('should correctly sort patch', () => {
		expect(compareVersion('1.0.0', '1.0.1')).toBe(-1);
		expect(compareVersion('1.2.2', '1.2.3-alpha')).toBe(-1);
	});
});

describe('versionSatisfies', () => {
	it('should assume greater-than-or-equal comparator', () => {
		expect(versionSatisfies('2.1', ['2', '2.1'])).toEqual(versionSatisfies('2.1', ['>=2', '>=2.1']));
	});
	it('should correctly apply greater-than-or-equal', () => {
		expect(versionSatisfies('1.0.1', ['>=1'])).toBe(true);
		expect(versionSatisfies('1.0.0', ['>=1'])).toBe(true);
		expect(versionSatisfies('2', ['>=2.0.0.0'])).toBe(true);
		expect(versionSatisfies('2', ['>=2'])).toBe(true);
		expect(versionSatisfies('1', ['>=1.1'])).toBe(false);
		expect(versionSatisfies('1', ['>=2'])).toBe(false);
	});
	it('should correctly apply less-than-or-equal', () => {
		expect(versionSatisfies('1.0.0', ['<=1'])).toBe(true);
		expect(versionSatisfies('1.0.1', ['<=1'])).toBe(false);
		expect(versionSatisfies('2', ['<=2.0.0.0'])).toBe(true);
		expect(versionSatisfies('1', ['<=1.1'])).toBe(true);
		expect(versionSatisfies('1.1.3', ['<=1.1'])).toBe(false);
	});
	it('should correctly apply less-than', () => {
		expect(versionSatisfies('1.0.0', ['<1.0.1'])).toBe(true);
		expect(versionSatisfies('1.0.0', ['<1.0.0'])).toBe(false);
		expect(versionSatisfies('1.0.1', ['<1'])).toBe(false);
		expect(versionSatisfies('1.3', ['<2'])).toBe(true);
		expect(versionSatisfies('1', ['<1.1'])).toBe(true);
	});
	it('should correctly combine constraints', () => {
		expect(versionSatisfies('2.0.4', ['>=2', '<3'])).toBe(true);
		expect(versionSatisfies('2.0.5', ['>2.0.4', '<=2.0.5'])).toBe(true);
		expect(versionSatisfies('2.0.5', ['>2.0.4', '<2.0.5'])).toBe(false);
	});
});
