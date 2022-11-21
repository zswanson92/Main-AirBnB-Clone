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
      },
      {
        ownerId: 1,
        address: '56778 dummy seed data dr',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'United States',
        lat: 45.23,
        lng: 21.51,
        name: 'the deferral dome',
        description: 'just horrible',
        price: 3301.02
      },
      {
        ownerId: 1,
        address: '4998 yikes streets',
        city: 'Somewhere in Dakota',
        state: 'Dakota',
        country: 'United States',
        lat: 15.23,
        lng: 35.51,
        name: 'not a chill spot',
        description: 'not very chill',
        price: 102.45
      },
      {
        ownerId: 1,
        address: '33321 oh man ct',
        city: 'Atlanta',
        state: 'George',
        country: 'United States',
        lat: 11.23,
        lng: 39.51,
        name: 'poppin palace',
        description: 'wooow this place is poppin',
        price: 4000.25
      },
      {
        ownerId: 1,
        address: '1984 orwell st',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: 36.23,
        lng: 55.51,
        name: 'book burning bungalow',
        description: 'wow so much literature',
        price: 502.75
      },

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
      name: { [Op.in]: ['casa de banana', 'the nerd palace', 'super cool place to stay', 'the deferral dome', 'not a chill spot', 'poppin palace', 'book burning bungalow']}
    }, {})
  }
};
