'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const bcrypt = require("bcryptjs");
const { query } = require("express");
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
   options.tableName = 'Users';
   return queryInterface.bulkInsert(options, [
    {
      email: 'bang@fake.govee',
      username: 'teamramrod',
      hashedPassword: bcrypt.hashSync('password'),
      firstName: 'Sam',
      lastName: 'Bear'
    },
    {
      email: 'xd@animeweebo.not',
      username: 'smileyface',
      hashedPassword: bcrypt.hashSync('password2'),
      firstName: 'gem',
      lastName: 'stone'
    },
    {
      email: 'gunnaturnleft@nascar.wins',
      username: 'dalearnheart',
      hashedPassword: bcrypt.hashSync('password3'),
      firstName: 'vet',
      lastName: 'testo'
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
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['teamramrod', 'smileyface', 'dalearnheart']}
    }, {})
  }
};
