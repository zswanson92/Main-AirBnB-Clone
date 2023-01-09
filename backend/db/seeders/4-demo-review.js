'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

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
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
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
      },
      {
        spotId: 4,
        userId: 1,
        review: 'man this place is sort of ok',
        stars: 4
      },
      {
        spotId: 5,
        userId: 1,
        review: 'WOW BEST PLACE IVE EVER STAYED',
        stars: 5
      },
      {
        spotId: 6,
        userId: 2,
        review: 'WOW WORST PLACE IVE EVER STAYED',
        stars: 1
      },
      {
        spotId: 7,
        userId: 3,
        review: 'WOW MOST MID PLACE IVE EVER STAYED',
        stars: 3
      },
      {
        spotId: 8,
        userId: 3,
        review: 'absolutely beautiful villa, marble floors really nice touch',
        stars: 2
      },
      {
        spotId: 9,
        userId: 1,
        review: 'insane views, cant wait to return so I can try the microwave',
        stars: 4
      },
      {
        spotId: 10,
        userId: 3,
        review: 'gorgeous scenery, really wanna visit the local zoo next time',
        stars: 5
      },
      {
        spotId: 11,
        userId: 3,
        review: 'would not reccommend this place to stay, kinda gross',
        stars: 1
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
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['man this place rules', 'man this place sucks', 'man this place is mid', 'man this place is sort of ok', 'WOW BEST PLACE IVE EVER STAYED', 'WOW WORST PLACE IVE EVER STAYED', 'WOW MOST MID PLACE IVE EVER STAYED',
      'absolutely beautiful villa, marble floors really nice touch', 'insane views, cant wait to return so I can try the microwave', 'gorgeous scenery, really wanna visit the local zoo next time',
      'would not reccommend this place to stay, kinda gross']}
    }, {})
  }
};
