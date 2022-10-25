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
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'googoogaga.abcd',
        preview: true
      },
      {
        spotId: 2,
        url: 'somethingelse.xyza',
        preview: true
      },
      {
        spotId: 3,
        url: 'thefinalurl.plswork',
        preview: true
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
    return queryInterface.bulkDelete('SpotImages', {
      url: { [Op.in]: ['googoogaga.abcd', 'somethingelse.xyza', 'thefinalurl.plswork']}
    }, {})
  }
};
