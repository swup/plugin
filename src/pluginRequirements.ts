import type Swup from 'swup';

import { versionSatisfies } from './versionSatisfies.js';

function getInstalledDependencyVersion(dependency: string, swup: Swup): string {
	if (dependency === 'swup') {
		return swup.version ?? '';
	} else {
		// Circular type dependency?
		// findPlugin returns swup's Plugin type which is not up-to-date
		// with the actual Plugin type from index.ts
		const plugin = swup.findPlugin(dependency);
		return plugin?.version ?? '';
	}
}

export function checkDependencyVersion(
	dependency: string,
	requirements: string[],
	swup: Swup
): boolean {
	const version = getInstalledDependencyVersion(dependency, swup);
	if (version) {
		return versionSatisfies(version, requirements);
	} else {
		return false;
	}
}
