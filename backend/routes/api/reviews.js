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
            attributes: { exclude: ['createdAt', 'updatedAt', 'reviewId']}
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
    const { reviewId } = req.params
    let theReview = await Review.findByPk(reviewId)
    // const theSpot = await Spot.findByPk(theReview.spotId)
    const { url } = req.body
    const { user } = req
    const userId = user.toSafeObject().id

    if(!theReview){
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    if(theReview){
        const newReviewImage = await ReviewImage.create({
            reviewId,
            url
        })
        let abc = await ReviewImage.findAll({
            where: { reviewId: reviewId}
        })
        // console.log(abc)
        if(abc.length > 10){
            res.status(403)
            res.json("Maximum number of images for this resource was reached")
        }
        await newReviewImage.validate()
        res.json({"id": newReviewImage.id, "url": url})
    }
    // else {
    //     res.status(404)
    //     res.json({
    //         "message": "Spot couldn't be found",
    //         "statusCode": 404
    //     })
    // }

}) // needs proper error for > 10 images

router.put('/:reviewId', requireAuth, async (req, res) => {
    // console.log(req)
    let { review, stars } = req.body
    // console.log(typeof review)
    // console.log(typeof +stars)
    stars = +stars
    const { reviewId } = req.params
    const theReview = await Review.findByPk(reviewId)
    const { user } = req
    const userId = user.toSafeObject().id

    if(!theReview){
        res.status(404)
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    // console.log(theReview)

    if(!review){
        res.status(400)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": { 'review': 'Review text is required.'}
           })
        }

    if(stars !== 1 && stars !== 2 && stars !== 3 && stars !== 4 && stars !== 5){
        res.status(400)
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": { 'stars': 'Stars must be an integer from 1 to 5'}
           })
    }

    if(theReview.userId === userId){
        theReview.set({
            "id": theReview.id,
            "userId": userId,
            "spotId": theReview.spotId,
            "review": review,
            "stars": stars
        })
        await theReview.save()
        return res.json(theReview)
    } else {
        return res.json("Review must belong to the current user.")
    }


}) // think this is working on local, keep an eye on the value of "id" and if that
// is being represented properly


// delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { reviewId } = req.params
    const theReview = await Review.findByPk(reviewId)
    const { user } = req
    const userId = user.toSafeObject().id

    // console.log(theReview)
    if(!theReview){
        res.status(404)
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }


    if(theReview.userId === userId){
            await theReview.destroy()
            res.json({
                "message": 'Successfully deleted',
                "statusCode": 200
            })
    } else {
        return res.json("Review must belong to the current user.")
    }
}) // working on LOCAL











module.exports = router;
