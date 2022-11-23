'use strict';

/**
 * burger service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::burger.burger');
