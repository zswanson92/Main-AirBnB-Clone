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
      },
      {
        spotId: 12,
        userId: 1,
        review: 'This place was FANTASTIC, I could not have been happier with my stay. Shout out to the host for the free towels.',
        stars: 4
      },
      {
        spotId: 13,
        userId: 2,
        review: 'It was an ok experience. Liked the local actitivities but the actual location was sub par. I think I saw a rat.',
        stars: 2
      },
      {
        spotId: 14,
        userId: 3,
        review: 'If I had the money I would buy this spot. Incredible experience, the balcony was truly spectacular. I cannot wait to get back here on my next vacation!',
        stars: 5
      },
      {
        spotId: 15,
        userId: 1,
        review: 'The plumbing just stopped working and I could not get a hold of the host. I had to go get a Motel after making a long trip down here.',
        stars: 1
      },
      {
        spotId: 16,
        userId: 2,
        review: 'Really enjoyed the centrality of this location, there was so much to do.',
        stars: 4
      },
      {
        spotId: 17,
        userId: 3,
        review: 'Cali King size bed. Need I say more?',
        stars: 5
      },
      {
        spotId: 18,
        userId: 1,
        review: 'We arrived to dirty dishes. Jankly made beds. Half the light bulbs did not work?.',
        stars: 2
      },
      {
        spotId: 19,
        userId: 2,
        review: 'The decor was really nice, but the lack of amenities was kind of a let down. There were some thing around to do but none of them were particularly interesting or fun.',
        stars: 3
      },
      {
        spotId: 20,
        userId: 3,
        review: 'Someone was staying there when I arrived? When I asked about the situation they threatened me. Irresonsible host - STAY AWAY.',
        stars: 1
      },
      {
        spotId: 21,
        userId: 1,
        review: 'The sight seeing at this location was immaculate. It was really child friendly which I appreciated bringing the 3 kiddos along. You gotta have the nachos at the Mexican spot up the street, some of the best I have ever had. Will be back!!',
        stars: 5
      },
      {
        spotId: 22,
        userId: 2,
        review: 'Only reason this did not get 5 stars from me was the bed was horrible, I had to sleep on the coach to spare my back. But really enjoyed the hot tub and the neighborhood cats who were SUPER friendly!',
        stars: 4
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
      'would not reccommend this place to stay, kinda gross', 'This place was FANTASTIC, I could not have been happier with my stay. Shout out to the host for the free towels.', 'It was an ok experience. Liked the local actitivities but the actual location was sub par. I think I saw a rat.',
      'If I had the money I would buy this spot. Incredible experience, the balcony was truly spectacular. I cannot wait to get back here on my next vacation!', 'The plumbing just stopped working and I could not get a hold of the host. I had to go get a Motel after making a long trip down here. Stay far away from this spot.',
      'Really enjoyed the centrality of this location, there was so much to do. The temperature control was my favorite aspect of staying here. It felt really responsive and as a naturally cold person being able to blast the heat was much appreciated.', 'Cali King size bed. Need I say more?',
      'We arrived to dirty dishes. Jankly made beds. Half the light bulbs did not work? The only redeemable value this property had was its view, which was beautiful, but I would be very cautious about staying here.', 'The decor was really nice, but the lack of amenities was kind of a let down. There were some thing around to do but none of them were particularly interesting or fun. I enjoyed the quiet that could be find while staying in. Not sure if I would come back.',
      'Someone was staying there when I arrived? When I asked about the situation they threatened me. Irresonsible host - STAY AWAY.', 'The sight seeing at this location was immaculate. It was really child friendly which I appreciated bringing the 3 kiddos along. You gotta have the nachos at the Mexican spot up the street, some of the best I have ever had. Will be back!!',
      'Only reason this did not get 5 stars from me was the bed was horrible, I had to sleep on the coach to spare my back. But really enjoyed the hot tub and the neighborhood cats who were SUPER friendly! Would certainly recommend, especially if you like hard beds.' ]}
    }, {})
  }
};
