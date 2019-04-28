export default class Plugin {
    defaultOptions = {};

    constructor(definedOptions) {
        const options = {
            ...defaultOptions,
            ...definedOptions
        }

        this.options = options;

        if (typeof this.name !== "string") {
            console.warn('Swup plugin must have a name.');
        }
    }

    mount() {
        // this is mount method rewritten by class extending
        // and is executed when swup is enabled with plugin
    }

    unmount() {
        // this is unmount method rewritten by class extending
        // and is executed when swup with plugin is disabled
    }

    // this is here so we can tell if plugin was created by extending this class
    isSwupPlugin = true;
}
