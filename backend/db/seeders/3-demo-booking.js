'use strict';


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
        startDate: new Date('2023-04-12T16:32:02'),
        endDate: new Date('2023-04-23T16:37:02')
      },
      {
        spotId: 2,
        userId: 2,
        startDate: new Date('2023-05-12T16:34:02'),
        endDate: new Date('2023-05-16T16:39:02')
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date('2023-06-25T16:31:02'),
        endDate: new Date('2023-06-30T16:33:02')
      },
      {
        spotId: 4,
        userId: 1,
        startDate: new Date('2023-08-30T16:31:02'),
        endDate: new Date('2023-09-10T16:33:02')
      },
      {
        spotId: 5,
        userId: 2,
        startDate: new Date('2023-07-01T16:31:02'),
        endDate: new Date('2023-07-22T16:33:02')
      },
      {
        spotId: 6,
        userId: 3,
        startDate: new Date('2023-09-12T16:31:02'),
        endDate: new Date('2023-09-15T16:33:02')
      },
      {
        spotId: 7,
        userId: 1,
        startDate: new Date('2023-04-15T16:31:02'),
        endDate: new Date('2023-04-30T16:33:02')
      },
      {
        spotId: 8,
        userId: 2,
        startDate: new Date('2023-05-15T16:31:02'),
        endDate: new Date('2023-06-02T16:33:02')
      },
      {
        spotId: 9,
        userId: 3,
        startDate: new Date('2023-05-01T16:31:02'),
        endDate: new Date('2023-05-22T16:33:02')
      },
      {
        spotId: 10,
        userId: 1,
        startDate: new Date('2023-10-15T16:31:02'),
        endDate: new Date('2023-10-19T16:33:02')
      },
      {
        spotId: 11,
        userId: 2,
        startDate: new Date('2023-04-15T16:31:02'),
        endDate: new Date('2023-05-04T16:33:02')
      },
      {
        spotId: 12,
        userId: 3,
        startDate: new Date('2023-05-22T16:31:02'),
        endDate: new Date('2023-06-10T16:33:02')
      },
      {
        spotId: 13,
        userId: 1,
        startDate: new Date('2023-03-15T16:31:02'),
        endDate: new Date('2023-04-20T16:33:02')
      },
      {
        spotId: 14,
        userId: 2,
        startDate: new Date('2023-02-20T16:31:02'),
        endDate: new Date('2023-03-20T16:33:02')
      },
      {
        spotId: 15,
        userId: 3,
        startDate: new Date('2023-02-21T16:31:02'),
        endDate: new Date('2023-03-05T16:33:02')
      },
      {
        spotId: 16,
        userId: 1,
        startDate: new Date('2023-07-02T16:31:02'),
        endDate: new Date('2023-07-22T16:33:02')
      },
      {
        spotId: 17,
        userId: 2,
        startDate: new Date('2023-06-10T16:31:02'),
        endDate: new Date('2023-06-25T16:33:02')
      },
      {
        spotId: 18,
        userId: 3,
        startDate: new Date('2023-04-30T16:31:02'),
        endDate: new Date('2023-07-21T16:33:02')
      },
      {
        spotId: 19,
        userId: 1,
        startDate: new Date('2023-03-15T16:31:02'),
        endDate: new Date('2023-03-19T16:33:02')
      },
      {
        spotId: 20,
        userId: 2,
        startDate: new Date('2023-04-28T16:31:02'),
        endDate: new Date('2023-05-28T16:33:02')
      },
      {
        spotId: 21,
        userId: 3,
        startDate: new Date('2023-02-19T16:31:02'),
        endDate: new Date('2023-03-21T16:33:02')
      },
      {
        spotId: 22,
        userId: 1,
        startDate: new Date('2023-11-30T16:31:02'),
        endDate: new Date('2023-12-30T16:33:02')
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
        [Op.in]: [04 / 12 / 2023, 05 / 12 / 23, 06 / 25 / 23, 08 / 30 / 23, 07 / 01 / 23,
        09 / 12 / 23, 04 / 15 / 23, 05 / 15 / 23, 05 / 01 / 23, 10 / 15 / 23, 04 / 15 / 23, 05 / 22 / 23,
        03 / 15 / 23, 02 / 20 / 23, 02 / 21 / 23, 07 / 02 / 23, 06 / 10 / 23, 04 / 30 / 23, 03 / 15 / 23, 04 / 28 / 23,
        02 / 19 / 23, 11 / 30 / 23]
      }
    }, {})
  }
};
