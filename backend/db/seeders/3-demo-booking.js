// 'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date('2023-04-12T00:00:00'),
        endDate: new Date('2023-04-23T00:00:00')
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2023-05-12T00:00:00'),
        endDate: new Date('2023-05-16T00:00:00')
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('2023-06-25T00:00:00'),
        endDate: new Date('2023-06-30T00:00:00')
      },
      {
        spotId: 4,
        userId: 1,
        startDate: new Date('2023-08-30T00:00:00'),
        endDate: new Date('2023-09-10T00:00:00')
      },
      {
        spotId: 5,
        userId: 2,
        startDate: new Date('2023-07-01T00:00:00'),
        endDate: new Date('2023-07-22T00:00:00')
      },
      {
        spotId: 6,
        userId: 3,
        startDate: new Date('2023-09-12T00:00:00'),
        endDate: new Date('2023-09-15T00:00:00')
      },
      {
        spotId: 7,
        userId: 1,
        startDate: new Date('2023-04-15T00:00:00'),
        endDate: new Date('2023-04-30T00:00:00')
      },
      {
        spotId: 8,
        userId: 2,
        startDate: new Date('2023-05-15T00:00:00'),
        endDate: new Date('2023-06-02T00:00:00')
      },
      {
        spotId: 9,
        userId: 3,
        startDate: new Date('2023-05-01T00:00:00'),
        endDate: new Date('2023-05-22T00:00:00')
      },
      {
        spotId: 10,
        userId: 1,
        startDate: new Date('2023-10-15T00:00:00'),
        endDate: new Date('2023-10-19T00:00:00')
      },
      {
        spotId: 11,
        userId: 2,
        startDate: new Date('2023-04-15T00:00:00'),
        endDate: new Date('2023-05-04T00:00:00')
      },
      {
        spotId: 12,
        userId: 3,
        startDate: new Date('2023-05-22T00:00:00'),
        endDate: new Date('2023-06-10T00:00:00')
      },
      {
        spotId: 13,
        userId: 1,
        startDate: new Date('2023-03-15T00:00:00'),
        endDate: new Date('2023-04-20T00:00:00')
      },
      {
        spotId: 14,
        userId: 2,
        startDate: new Date('2023-02-20T00:00:00'),
        endDate: new Date('2023-03-20T00:00:00')
      },
      {
        spotId: 15,
        userId: 3,
        startDate: new Date('2023-02-21T00:00:00'),
        endDate: new Date('2023-03-05T00:00:00')
      },
      {
        spotId: 16,
        userId: 1,
        startDate: new Date('2023-07-02T00:00:00'),
        endDate: new Date('2023-07-22T00:00:00')
      },
      {
        spotId: 17,
        userId: 2,
        startDate: new Date('2023-06-10T00:00:00'),
        endDate: new Date('2023-06-25T00:00:00')
      },
      {
        spotId: 18,
        userId: 3,
        startDate: new Date('2023-04-30T00:00:00'),
        endDate: new Date('2023-07-21T00:00:00')
      },
      {
        spotId: 19,
        userId: 1,
        startDate: new Date('2023-03-15T00:00:00'),
        endDate: new Date('2023-03-19T00:00:00')
      },
      {
        spotId: 20,
        userId: 2,
        startDate: new Date('2023-04-28T00:00:00'),
        endDate: new Date('2023-05-28T00:00:00')
      },
      {
        spotId: 21,
        userId: 3,
        startDate: new Date('2023-02-19T00:00:00'),
        endDate: new Date('2023-03-21T00:00:00')
      },
      {
        spotId: 22,
        userId: 1,
        startDate: new Date('2023-11-30T00:00:00'),
        endDate: new Date('2023-12-30T00:00:00')
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: {
        [Op.in]: [04/12/2023, 05/12/23, 06/25/23, 08/30/23, 07/01/23,
        09/12/23, 04/15/23, 05/15/23, 05/01/23, 10/15/23, 04/15/23, 05/22/23,
        03/15/23, 02/20/23, 02/21/23, 07/02/23, 06/10/23, 04/30/23, 03/15/23, 04/28/23,
        02/19/23, 11/30/23]
      }
    }, {})
  }
};
