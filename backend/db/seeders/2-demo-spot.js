'use strict';
// const bcrypt = require("bcryptjs");
// const { query } = require("express");

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
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '1234 banana ave',
        city: 'Portland',
        state: 'Oregon',
        country: 'United States',
        lat: 50.23,
        lng: 23.51,
        name: 'casa de banana',
        description: 'beautifully yellow and oblong',
        price: 2000.99
      },
      {
        ownerId: 2,
        address: '5678 azeroth dr',
        city: 'Amsterdam',
        state: 'Texas',
        country: 'United States',
        lat: 44.28,
        lng: 31.66,
        name: 'the nerd palace',
        description: 'WoW its impressively nerdy',
        price: 1056.99
      },
      {
        ownerId: 3,
        address: '9999 outofideas cir',
        city: 'Lamesville',
        state: 'Ohio',
        country: 'United States',
        lat: 99.83,
        lng: 66.44,
        name: 'super cool place to stay',
        description: 'making seed data is hard',
        price: 1556.99
      },
      {
        ownerId: 1,
        address: '56778 dummy seed data dr',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'United States',
        lat: 45.23,
        lng: 21.51,
        name: 'the deferral dome',
        description: 'just horrible',
        price: 3301.02
      },
      {
        ownerId: 1,
        address: '4998 yikes streets',
        city: 'Somewhere in Dakota',
        state: 'Dakota',
        country: 'United States',
        lat: 15.23,
        lng: 35.51,
        name: 'not a chill spot',
        description: 'not very chill',
        price: 102.45
      },
      {
        ownerId: 1,
        address: '33321 oh man ct',
        city: 'Atlanta',
        state: 'George',
        country: 'United States',
        lat: 11.23,
        lng: 39.51,
        name: 'poppin palace',
        description: 'wooow this place is poppin',
        price: 4000.25
      },
      {
        ownerId: 1,
        address: '1984 orwell st',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        lat: 36.23,
        lng: 55.51,
        name: 'book burning bungalow',
        description: 'wow so much literature',
        price: 502.75
      },
      {
        ownerId: 2,
        address: '77091 awesome sauce plaza',
        city: 'Gator City',
        state: 'Florida',
        country: 'United States',
        lat: 77.23,
        lng: 88.51,
        name: 'some place in florida',
        description: 'watch out for gators',
        price: 905.75
      },
      {
        ownerId: 3,
        address: '9992 snowsville lane',
        city: 'Anchorage',
        state: 'Alaska',
        country: 'United States',
        lat: 62.23,
        lng: 29.51,
        name: 'the icky igloo',
        description: 'BRR this is ALASKA',
        price: 27.99
      },
      {
        ownerId: 1,
        address: '100 nowhere st',
        city: 'Desolation',
        state: 'Indiana',
        country: 'United States',
        lat: 15.23,
        lng: 39.51,
        name: 'the chill farm',
        description: 'great place to watch grass grow',
        price: 100.12
      },
      {
        ownerId: 1,
        address: '56 amazon pod back alley',
        city: 'Seattle',
        state: 'Washington',
        country: 'United States',
        lat: 99.23,
        lng: 78.51,
        name: 'failed dev den',
        description: 'you can work at amazon and live here!',
        price: 55.12
      },
      {
        ownerId: 2,
        address: '88312 S Irvington St',
        city: 'Boise',
        state: 'Idaho',
        country: 'United States',
        lat: 29.77,
        lng: 48.23,
        name: 'Idaho Incubator',
        description: 'A small apartment designed primarily as an office work space. Not much in the way of amenities outside of standard office supplies. The computers are maintained well and the internet connection is very good.',
        price: 400
      },
      {
        ownerId: 3,
        address: '4291 E Hoagg pl',
        city: 'Huntsville',
        state: 'Alabama',
        country: 'United States',
        lat: 20.15,
        lng: 08.88,
        name: 'Deep South Den',
        description: 'A great location in a great locale. A true deep south experience with ample hunting available nearby. What is lacks for in local businesses it makes up for in experience.',
        price: 375.75
      },
      {
        ownerId: 1,
        address: '6113 SW Justice cir',
        city: 'Salt Lake City',
        state: 'Utah',
        country: 'United States',
        lat: 30.29,
        lng: 47.22,
        name: 'Salt Lake City High Rise',
        description: 'Apartment on the 21st floor overlooking the entirety of Salt Lake City. Comes with a gym, hot tub, and sauna. In the middle of a lot of fun activities to be found in Salt Lake City.',
        price: 800
      },
      {
        ownerId: 2,
        address: '1155 NE platter rd.',
        city: 'El Paso',
        state: 'Texas',
        country: 'United States',
        lat: 35.99,
        lng: 21.08,
        name: 'El Paso den',
        description: 'Gorgeous Texas property at a great price, availability is high.',
        price: 550
      },
      {
        ownerId: 3,
        address: '2290 Tarheel Cir',
        city: 'Charlotte',
        state: 'North Carolina',
        country: 'United States',
        lat: 51.82,
        lng: 57,
        name: 'The Tarheel House',
        description: 'A dream location for any college basketball fan. Come enjoy the beautiful scenery that North Carolina has to offer in this custom catered villa for Tar Heel fans.',
        price: 750
      },
      {
        ownerId: 1,
        address: '88769 Beach Ave',
        city: 'Baltimore',
        state: 'Maryland',
        country: 'United States',
        lat: 23.09,
        lng: 87.11,
        name: 'Crab Cabin',
        description: 'A lovely location to relax and enjoy some gorgeous Baltimore shores. Comes equipped with nets and a small boat for those that may want to engage in crabbing to get a true Maryland experience!',
        price: 450.50
      },
      {
        ownerId: 2,
        address: '12054 N main St',
        city: 'Miami',
        state: 'Florida',
        country: 'United States',
        lat: 65.32,
        lng: 33.15,
        name: 'Southshore Apartment',
        description: "High rise apartment that overlooks a large portion of the south end of Miami's downtown. Very close access to a large number of restaraunts and night clubs.",
        price: 1000.01
      },
      {
        ownerId: 3,
        address: '4478 SE combs Ave',
        city: 'Minneapolis',
        state: 'Minnesota',
        country: 'United States',
        lat: 22.77,
        lng: 38.41,
        name: 'Cozy Cabin',
        description: 'A small cabin located on the outskirts of Minneaplos. A quiet and modest location for those lookings for peace and quiet or time away from the big city. Includes wood for fireplace.',
        price: 330
      },
      {
        ownerId: 1,
        address: '70123 12th Street',
        city: 'New Orleans',
        state: 'Louisiana',
        country: 'United States',
        lat: 67.17,
        lng: 95.23,
        name: 'Creole Casa',
        description: 'An apartment in the heart of downtown New Orleans. A location central to the good times to be found in the city, next to many restaraunts. Very limited availability around Mardi Gras.',
        price: 800.25
      },
      {
        ownerId: 2,
        address: '6653 N 10th blvd',
        city: 'Buffalo',
        state: 'New York',
        country: 'United States',
        lat: 21.09,
        lng: 11.06,
        name: 'Buffalo Bungalow',
        description: 'A subtle apartment on the outskirts of Buffalo. We get a lot of snow here and expect occupants to be able to handle it on their own. Semi-close to the football stadium if you want to catch a Bills game.',
        price: 475
      },
      {
        ownerId: 3,
        address: '9842 Cowgraze Lane',
        city: 'Madison',
        state: 'Wisconsin',
        country: 'United States',
        lat: 47.23,
        lng: 43.99,
        name: 'Madison Farm',
        description: 'Farm property with 6 acres available. No animals are homed here. No neighbors nearby, great place to enjoy some of the beautiful flat scenery that Wisconsin has to offer.',
        price: 550
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
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['casa de banana', 'the nerd palace', 'super cool place to stay', 'the deferral dome', 'not a chill spot', 'poppin palace', 'book burning bungalow',
      'some place in florida', 'the icky igloo', 'the chill farm', 'failed dev den', 'Idaho Incubator', 'Deep South Den',
      'Salt Lake City High Rise', 'El Paso den', 'The Tarheel House', 'Crab Cabin', 'Southshore Apartment', 'Cozy Cabin',
      'Creole Casa', 'Buffalo Bungalow', 'Madison Farm']}
    }, {})
  }
};
