import { versionSatisfies } from 'swup/helpers';

export default function checkVersion(swup, required) {
	return Object.entries(required).reduce(
		(satisfied, [dependency, requirements]) =>
			satisfied && dependencySatisfiesRequirements(dependency, requirements, swup),
		true
	);
};

function dependencySatisfiesRequirements(dependency, requirements, swup) {
	if (!Array.isArray(requirements)) {
		requirements = [requirements];
	}
	const version = getInstalledDependencyVersion(dependency, swup);
	return version && versionSatisfies(version, requirements);
};

function getInstalledDependencyVersion(dependency, swupInstance) {
	if (dependency === 'swup') {
		return swupInstance.version;
	} else {
		return swupInstance.findPlugin(dependency)?.version;
	}
}
