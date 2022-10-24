'use strict';

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
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: 'man this place rules',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'man this place sucks',
        stars: 1
      },
      {
        spotId: 3,
        userId: 3,
        review: 'man this place is mid',
        stars: 3
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
    return queryInterface.bulkDelete('Reviews', {
      review: { [Op.in]: ['man this place rules', 'man this place sucks', 'man this place is mid']}
    }, {})
  }
};
