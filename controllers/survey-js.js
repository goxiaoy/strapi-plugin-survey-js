'use strict';

/**
 * survey-js.js controller
 *
 * @description: A set of functions called "actions" of the `survey-js` plugin.
 */

module.exports = {

  async getSettings(ctx) {
    const data = await strapi.plugins['survey-js'].services['survey-js'].getSettings();

    ctx.body = { data };
  },

  async updateSettings(ctx) {
    const data=ctx.request.body;
    await strapi.plugins['survey-js'].services['survey-js'].setSettings(data);
  
    ctx.body = { data };
  },
};
