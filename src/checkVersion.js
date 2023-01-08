import { versionSatisfies } from 'swup/helpers';

export default function checkVersion(dependency, requirements, swup) {
	const version = getInstalledDependencyVersion(dependency, swup);
	return version && versionSatisfies(version, requirements);
}

function getInstalledDependencyVersion(dependency, swupInstance) {
	if (dependency === 'swup') {
		return swupInstance.version;
	} else {
		return swupInstance.findPlugin(dependency)?.version;
	}
}
