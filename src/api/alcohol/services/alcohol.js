'use strict';

/**
 * alcohol service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::alcohol.alcohol');
