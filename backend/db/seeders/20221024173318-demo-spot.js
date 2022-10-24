'use strict';
// const bcrypt = require("bcryptjs");
// const { query } = require("express");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '1234 banana ave',
        city: 'Portland',
        state: 'Oregon',
        country: 'United States',
        lat: 50.23,
        lng: 23.51,
        name: 'casa de banana',
        description: 'beautifully yellow and oblong',
        price: 2000.99
      },
      {
        ownerId: 2,
        address: '5678 azeroth dr',
        city: 'Amsterdam',
        state: 'Texas',
        country: 'United States',
        lat: 44.28,
        lng: 31.66,
        name: 'the nerd palace',
        description: 'WoW its impressively nerdy',
        price: 1056.99
      },
      {
        ownerId: 3,
        address: '9999 outofideas cir',
        city: 'Lamesville',
        state: 'Ohio',
        country: 'United States',
        lat: 99.83,
        lng: 66.44,
        name: 'super cool place to stay',
        description: 'making seed data is hard',
        price: 1556.99
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      name: { [Op.in]: ['casa de banana', 'the nerd palace', 'super cool place to stay']}
    }, {})
  }
};
