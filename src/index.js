export default class Plugin {
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
