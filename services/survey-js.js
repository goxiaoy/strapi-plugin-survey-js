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
                name: 'surveyjs',
                key: 'settings',
            })
            .get();
    },

    setSettings(value) {
        return strapi
            .store({
                type: 'plugin',
                name: 'surveyjs',
                key: 'settings',
            })
            .set({ value });
    },
};
