const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Sequelize, User, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { route } = require('./session');

const router = express.Router();

// get all reviews of the current user
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const { user } = req
    const userId = user.toSafeObject().id

    const theReviews = await Review.findAll({
        where: { userId: userId }
    })

    let emptyArr = []
    for(let i = 0; i < theReviews.length; i++){
        let aReview = theReviews[i].toJSON()

        let user = await User.findAll({
            raw: true,
            where: { id: theReviews[i].userId },
            attributes: { exclude: ['username']}
        })

        let spot = await Spot.findAll({
            where: {id: theReviews[i].spotId},
            attributes: { exclude: ['createdAt', 'updatedAt', 'description']}
        })

        let reviewImage = await ReviewImage.findAll({
            raw: true,
            where: { id: theReviews[i].id },
            attributes: { exclude: ['createdAt', 'updatedAt']}
        })

        let spotImage = await SpotImage.findAll({
            raw: true,
            where: { spotId: theReviews[i].id },
            attributes: { exclude: ['createdAt', 'updatedAt']}
        })

        if(user){
            aReview.User = user[0]
        }
        if(spot){
            aReview.Spot = spot[0]
        }
        if(reviewImage.length){
            aReview.ReviewImages = reviewImage
        } else {
            aReview.ReviewImages = 'There are no review images'
        }

        aReview.Spot = aReview.Spot.toJSON()
        if(spotImage[0]){
            aReview.Spot.previewImage = spotImage[0].url
        } else aReview.Spot.previewImage = 'no preview image url available'

        emptyArr.push(aReview)
    }

    res.json({"Reviews": emptyArr})
}) // seems to be working on local

router.post('/:reviewId/images', requireAuth, async (req, res) => {

})












module.exports = router;
