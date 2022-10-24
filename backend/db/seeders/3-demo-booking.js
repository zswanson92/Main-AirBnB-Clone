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
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: '2022-10-30T16:32:02',
        endDate: '2022-11-11T16:37:02'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2022-11-30T16:34:02',
        endDate: '2022-12-11T16:39:02'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2022-12-30T16:31:02',
        endDate: '2022-12-31T16:33:02'
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
    return queryInterface.bulkDelete('Bookings', {
      startDate: { [Op.in]: [10/30/22, 11/30/22, 12/30/22]}
    }, {})
  }
};
