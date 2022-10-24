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
    return queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: 'exampleurl.exampleurl'
      },
      {
        reviewId: 1,
        url: 'yawn.mcsleepy'
      },
      {
        reviewId: 1,
        url: 'hungry.eat'
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
    return queryInterface.bulkDelete('ReviewImages', {
      url: { [Op.in]: ['exampleurl.exampleurl', 'yawn.mcsleepy', 'hungry.eat']}
    }, {})
  }
};
