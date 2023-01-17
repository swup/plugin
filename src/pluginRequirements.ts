import { Swup } from './index';
import { versionSatisfies } from './versionSatisfies';

function getInstalledDependencyVersion(dependency: string, swupInstance: Swup): string {
	if (dependency === 'swup') {
		return swupInstance.version ?? '';
	} else {
		const plugin = swupInstance.findPlugin(dependency);
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
