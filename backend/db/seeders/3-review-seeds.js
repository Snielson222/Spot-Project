'use strict';
const { Review } = require('../models');
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 1,
        review: 'Good for the price! A bit run down, but good for school',
        stars: 3
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Amazing house! Surrounded by forests and right off the highway',
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Gets the job done, could have found a nicer place for the money',
        stars: 2
      },
      {
        spotId: 4,
        userId: 4,
        review: 'GOT HURT SKIING',
        stars: 1
      },
      {
        spotId: 5,
        userId: 5,
        review: 'Nice house, not a ton nearby',
        stars: 4
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
