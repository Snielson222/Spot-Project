'use strict';
const { Booking } = require('../models');
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: 20230905180318,
        endDate: 20231105180318
      },
      {
        spotId: 2,
        userId: 3,
        startDate: 20230905180319,
        endDate: 20231005180318
      },
      {
        spotId: 3,
        userId: 1,
        startDate: 20230905180317,
        endDate: 20231205180318
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
