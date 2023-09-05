'use strict';
const { Spot } = require('../models');
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: '816 Quarry st.',
        city: 'Gallitzin',
        state: 'PA',
        country: 'USA',
        lat: 40.4823,
        lng: 78.5517,
        name: 'College Rental',
        description:'Charming 2 bedroom house perfect for students who attend the local University',
        price: 100
      },
      {
        ownerId: 2,
        address: '838 Route 114',
        city: 'South Sutton',
        state: 'NH',
         country: 'USA',
         lat: 43.3193,
         lng: 71.9346,
         name: 'Mountain Home',
         description: 'Beautiful 3 bedroom house in the lakes region, very private, and close to ski mountains',
         price: 350
      },
      {
        ownerId: 3,
        address: '123 Fake st.',
        city: 'Pueblo',
        state: 'CO',
        country: 'USA',
        lat: 38.3104,
        lng: 104.6338,
        name: 'Trailer Park Charm',
        description: 'Quaint 3 bedroom double-wide in a nice park close to lake Pueblo',
        price: 200
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['CO', 'NH', 'PA'] }
    }, {});
  }
};
