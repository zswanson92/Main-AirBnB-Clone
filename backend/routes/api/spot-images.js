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
    const spotImages = await SpotImage.findByPk(imageId)


    if(!spotImages){
        res.status(404)
        return res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }
    const theSpot = await Spot.findByPk(spotImages.spotId)
    if(theSpot.ownerId === userId){
        await spotImages.destroy()
        return res.json({
            "message": 'Successfully deleted',
            "statusCode": 200
        })
    } else {
        res.status(404)
        return res.json("Spot must beloong to current user")
    }
})

module.exports = router;
