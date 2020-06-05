'use strict';

/**
 * survey-js.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {

    getSettings() {
        return strapi
            .store({
                type: 'plugin',
                name: 'survery-js',
                key: 'settings',
            })
            .get();
    },

    setSettings(value) {
        return strapi
            .store({
                type: 'plugin',
                name: 'survery-js',
                key: 'settings',
            })
            .set({ value });
    },
};
