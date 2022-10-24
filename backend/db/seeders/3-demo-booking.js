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
        startDate: 2022/10/30,
        endDate: 2022/11/11
      },
      {
        spotId: 2,
        userId: 2,
        startDate: 2022-11-30,
        endDate: 2022/12/11
      },
      {
        spotId: 3,
        userId: 3,
        startDate: 2022-12-30,
        endDate: 2022-12-31
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
