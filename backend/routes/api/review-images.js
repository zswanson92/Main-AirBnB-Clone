const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review, Sequelize, User, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params
    const { user } = req
    const userId = user.toSafeObject().id
    const reviewImages = await ReviewImage.findByPk(imageId)


    if(!reviewImages){
        res.status(404)
        return res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }
    const theReview = await Review.findByPk(reviewImages.reviewId)
    // console.log(theReview.dataValues.userId)
    // console.log(userId)
    if(theReview.dataValues.userId === userId){
        await reviewImages.destroy()
        return res.json({
            "message": 'Successfully deleted',
            "statusCode": 200
        })
    } else {
        res.status(404)
        return res.json("Review must belong to current user")
    }
})

module.exports = router;
