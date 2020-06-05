'use strict';
module.exports = async () => {
    // set plugin store
    const configurator = strapi.store({
        type: 'plugin',
        name: 'survery-js',
        key: 'settings',
    });

    // if provider config does not exist set one by default
    const config = await configurator.get();

    if (!config) {
        await configurator.set({
            value: {
                license: false
            },
        });
    }
}