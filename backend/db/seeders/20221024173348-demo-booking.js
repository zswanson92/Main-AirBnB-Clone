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
        startDate: 10/30/22,
        endDate: 11/11/22
      },
      {
        spotId: 2,
        userId: 2,
        startDate: 11/30/22,
        endDate: 12/11/22
      },
      {
        spotId: 3,
        userId: 3,
        startDate: 12/30/22,
        endDate: 12/31/22
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
