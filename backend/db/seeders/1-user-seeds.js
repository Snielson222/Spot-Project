'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    await User.bulkCreate( [
      {
        firstName: 'Steve',
        lastName: 'Nielson',
        username: 'Steve',
        hashedPassword: bcrypt.hashSync('bamboo'),
        email: 'Steve@user.io'
      },
      {
        firstName: 'Chelsea',
        lastName: 'Nielson',
        username: 'Chelsea',
        hashedPassword: bcrypt.hashSync('lotus'),
         email: 'Chelsea@user.io'
      },
      {
        firstName: 'Violet',
        lastName: 'Nielson',
        username: 'Bear',
        hashedPassword: bcrypt.hashSync('violet'),
        email: 'Bear@user.io'
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
