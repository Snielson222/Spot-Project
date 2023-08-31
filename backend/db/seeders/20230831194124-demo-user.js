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
    await User.bulkCreate([
      {
        firstName: 'Steve',
        lastName: 'Nielson',
        email: 'Steve@user.io',
        username: 'Steve',
        hashedPassword: bcrypt.hashSync('bamboo')
      },
      {
        firstName: 'Chelsea',
        lastName: 'Nielson',
        email: 'Chelsea@user.io',
        username: 'Chelsea',
        hashedPassword: bcrypt.hashSync('lotus')
      },
      {
        firstName: 'Violet',
        lastName: 'Nielson',
        email: 'Bear@user.io',
        username: 'Bear',
        hashedPassword: bcrypt.hashSync('violet')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Steve', 'Chelsea', 'Bear'] }
    }, {});
  }
};
