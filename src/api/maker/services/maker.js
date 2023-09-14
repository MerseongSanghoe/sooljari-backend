'use strict';

/**
 * maker service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::maker.maker');
