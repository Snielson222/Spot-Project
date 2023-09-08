'use strict';
const { SpotImage } = require('../models');
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://www.trulia.com/pictures/thumbs_5/zillowstatic/fp/540af61bf602a09306c8b6f4306c2deb-full.webp',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://ssl.cdn-redfin.com/photo/154/bigphoto/697/4758697_1.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://www.suncommunities.com/wp-content/uploads/2016/07/north-point-estates-co-homes-big-porch.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://images.huffingtonpost.com/2016-01-11-1452471777-7790803-SkiCondoHuffPo-thumb.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://ssl.cdn-redfin.com/photo/234/mbphoto/839/genMid.170151839_4.jpg',
        preview: true
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {});
  }
};
