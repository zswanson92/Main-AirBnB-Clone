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
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyaVbl0nsuh8EaWC8BV8uO9lt4STwrhxNmOrApzvguTrUNKi1VBM8t0Qfs9WsyQ3bZnI&usqp=CAU',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://www.bhg.com/thmb/0Fg0imFSA6HVZMS2DFWPvjbYDoQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnnwtif9N2UKkmjYIqGXwmaNYqjglLfqX1Ng&usqp=CAU',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOVSidnCvxgH9evgZQd_LMbLwABSNCShXqQ&usqp=CAU',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-4UWZD5nr_QmV2eZrUtcvBuw1Zp05d20SQ&usqp=CAU',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxquQIJQWpyj4rCzhF1kvRBYfhadrYkF0ohxyby2IubGOEgUQiQ8C9v_8E3o158NB9CZ8&usqp=CAU',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQI3GrDPuJ8j94oecn5ajfzwbvKYU8SKJ5OQ&usqp=CAU',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnD4bqU_7kw_F3rn9ymzfXanxzhwVRKqhH8A&usqp=CAU',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Mn7n52nmJ4wosRX4FyDRmdJydwnDnPfNJDQWJTUSKkUYZ0dYOm9XLtXXsXIyUFdpJ24&usqp=CAU',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdt3gCGs6Ctpk9-Lp57rMzAB73uV2xqnKnhA&usqp=CAU',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/022719_boisemain.jpg',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://m.wsj.net/video/20220407/041222alabama/041222alabama_640x360.jpg',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://static01.nyt.com/images/2020/08/30/realestate/25ONLOCATION-SaltLakeCity-slide-EVWN/25ONLOCATION-SaltLakeCity-slide-EVWN-superJumbo.jpg',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://hgtvhome.sndimg.com/content/dam/images/door/fullset/2013/9/17/0/house-stories-debbi-hester-home-exterior.jpg.rend.hgtvcom.966.644.suffix/1427754846913.jpeg',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://media.architecturaldigest.com/photos/55f9e2879bff6eeb3a242878/16:9/w_1280,c_limit/dam-images-daily-2014-09-online-estates-charlotte-north-carolina-house-for-sale-01-exterior.jpg',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://media.istockphoto.com/id/179284694/photo/row-of-identical-houses-on-a-street.jpg?s=612x612&w=0&k=20&c=4X3QDyDFck0R8iB8u8bfwq-y9D_FU3hDtizUjrqOnps=',
        preview: true
      },
      {
        spotId: 18,
        url: 'https://media.istockphoto.com/id/1277026114/photo/modern-middle-class-neighborhood-architecture-in-miami-florida-usa.jpg?s=612x612&w=0&k=20&c=C0jO9Nq8V4M5PAWdWpA7dASItP9vew8obpnyd2U3MN4=',
        preview: true
      },
      {
        spotId: 19,
        url: 'https://ssl.cdn-redfin.com/photo/114/mbphoto/581/genMid.6322581_0.jpg',
        preview: true
      },
      {
        spotId: 20,
        url: 'https://media.gettyimages.com/id/538103697/photo/new-orleans-garden-district-mansion.jpg?s=612x612&w=gi&k=20&c=3CrHW38QHW_v8GS6cmSl_3h5xa1Jj3PatlwO0PfGI1c=',
        preview: true
      },
      {
        spotId: 21,
        url: 'https://images.squarespace-cdn.com/content/v1/54e201c7e4b00d4519b30502/1600875044025-MVBWMSWH6DD35FPMEY6V/DJI_0065+copy.jpg?format=1000w',
        preview: true
      },
      {
        spotId: 22,
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/ALLEN-MADISON_HOUSE%2C_WASHINGTON_COUNTY_RI.jpg/1200px-ALLEN-MADISON_HOUSE%2C_WASHINGTON_COUNTY_RI.jpg',
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
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyaVbl0nsuh8EaWC8BV8uO9lt4STwrhxNmOrApzvguTrUNKi1VBM8t0Qfs9WsyQ3bZnI&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGyaVbl0nsuh8EaWC8BV8uO9lt4STwrhxNmOrApzvguTrUNKi1VBM8t0Qfs9WsyQ3bZnI&usqp=CAU', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXRpZnVsJTIwaG91c2V8ZW58MHx8MHx8&w=1000&q=80',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnnwtif9N2UKkmjYIqGXwmaNYqjglLfqX1Ng&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuOVSidnCvxgH9evgZQd_LMbLwABSNCShXqQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-4UWZD5nr_QmV2eZrUtcvBuw1Zp05d20SQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxquQIJQWpyj4rCzhF1kvRBYfhadrYkF0ohxyby2IubGOEgUQiQ8C9v_8E3o158NB9CZ8&usqp=CAU',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQI3GrDPuJ8j94oecn5ajfzwbvKYU8SKJ5OQ&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnD4bqU_7kw_F3rn9ymzfXanxzhwVRKqhH8A&usqp=CAU',
'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5Mn7n52nmJ4wosRX4FyDRmdJydwnDnPfNJDQWJTUSKkUYZ0dYOm9XLtXXsXIyUFdpJ24&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdt3gCGs6Ctpk9-Lp57rMzAB73uV2xqnKnhA&usqp=CAU',
'https://www.brickunderground.com/sites/default/files/styles/blog_primary_image/public/blog/images/022719_boisemain.jpg', 'https://m.wsj.net/video/20220407/041222alabama/041222alabama_640x360.jpg',
'https://static01.nyt.com/images/2020/08/30/realestate/25ONLOCATION-SaltLakeCity-slide-EVWN/25ONLOCATION-SaltLakeCity-slide-EVWN-superJumbo.jpg', 'https://hgtvhome.sndimg.com/content/dam/images/door/fullset/2013/9/17/0/house-stories-debbi-hester-home-exterior.jpg.rend.hgtvcom.966.644.suffix/1427754846913.jpeg',
'https://media.architecturaldigest.com/photos/55f9e2879bff6eeb3a242878/16:9/w_1280,c_limit/dam-images-daily-2014-09-online-estates-charlotte-north-carolina-house-for-sale-01-exterior.jpg', 'https://media.istockphoto.com/id/179284694/photo/row-of-identical-houses-on-a-street.jpg?s=612x612&w=0&k=20&c=4X3QDyDFck0R8iB8u8bfwq-y9D_FU3hDtizUjrqOnps=',
'https://media.istockphoto.com/id/1277026114/photo/modern-middle-class-neighborhood-architecture-in-miami-florida-usa.jpg?s=612x612&w=0&k=20&c=C0jO9Nq8V4M5PAWdWpA7dASItP9vew8obpnyd2U3MN4=', 'https://ssl.cdn-redfin.com/photo/114/mbphoto/581/genMid.6322581_0.jpg',
'https://media.gettyimages.com/id/538103697/photo/new-orleans-garden-district-mansion.jpg?s=612x612&w=gi&k=20&c=3CrHW38QHW_v8GS6cmSl_3h5xa1Jj3PatlwO0PfGI1c=', 'https://images.squarespace-cdn.com/content/v1/54e201c7e4b00d4519b30502/1600875044025-MVBWMSWH6DD35FPMEY6V/DJI_0065+copy.jpg?format=1000w',
'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/ALLEN-MADISON_HOUSE%2C_WASHINGTON_COUNTY_RI.jpg/1200px-ALLEN-MADISON_HOUSE%2C_WASHINGTON_COUNTY_RI.jpg']}
    }, {})
  }
};
