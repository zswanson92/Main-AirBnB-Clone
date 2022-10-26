const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review, Sequelize, User, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const router = express.Router();


// get all spots
router.get('/', async (req, res) => {
    let aSpot = await Spot.findAll()

    let Spots = []
    for(let i = 0; i < aSpot.length; i++){
        let spot = aSpot[i].toJSON()

        let avgRating = await Review.findAll({
            raw: true,
            where: { spotId: aSpot[i].id},
            attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
        })

        let previewImage = await SpotImage.findAll({
            raw: true,
            where: { spotId: aSpot[i].id },
            attributes: ['url']
        })

        if(avgRating[0].avgRating){
            spot.avgRating = avgRating[0].avgRating
        } else spot.avgRating = 0

        if(previewImage[0]) spot.previewImage = previewImage[0].url
        Spots.push(spot)
    }

    return res.json({Spots})   // seems to be working on local
})

// get all spots owned by current user
router.get('/current', restoreUser, requireAuth, async (req, res) => {
    const { user } = req
    const userId = user.toSafeObject().id
    const specificSpot = await Spot.findAll({
        where: { ownerId: userId}
    })
    // console.log(specificSpot)
    let Spots = []
    for(let i = 0; i < specificSpot.length; i++){
    let spot = specificSpot[i].toJSON()

    let avgStarRating = await Review.findAll({
        raw: true,
        where: { spotId: specificSpot[i].id},
        attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
    })

    let spotImage = await SpotImage.findAll({
        raw: true,
        where: { spotId: specificSpot[i].id },
        attributes: { exclude: ['createdAt', 'updatedAt']}
    })


    if(avgStarRating[0].avgRating){
        spot.avgStarRating = avgStarRating[0].avgRating
    } else spot.avgStarRating = 0
    if(spotImage[0]){
        spot.previewImage = spotImage[0].url
    } else spot.previewImage = 'no preview image url available'
    Spots.push(spot)
    }
    if (user) {
        return res.json(
          {Spots}
        );
      } else return res.json('There is no current user.');
})
// need to add avg rating and previewimg url

// get details of a spot from spotId
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const theSpot = await Spot.findByPk(spotId)
    if(theSpot){
        let spot = theSpot.toJSON()

        let avgStarRating = await Review.findAll({
            raw: true,
            where: { spotId: theSpot.id},
            attributes: [[Sequelize.fn('AVG', Sequelize.col('stars')), 'avgRating']]
        })

        let numReviews = await Review.findAll({
            raw: true,
            where: { spotId: theSpot.id},
            attributes: [[Sequelize.fn('COUNT', Sequelize.col('review')), 'numReviews']]
        })

        let spotImage = await SpotImage.findAll({
            raw: true,
            where: { spotId: theSpot.id },
            attributes: { exclude: ['createdAt', 'updatedAt']}
        })

        let owner = await User.findAll({
            raw: true,
            where: { id: theSpot.ownerId },
            attributes: { exclude: ['username']}
        })

        if(owner[0]) spot.Owner = owner[0]
        if(numReviews[0].numReviews){
            spot.numReviews = numReviews[0].numReviews
        } else spot.numReviews = 0
        if(avgStarRating[0].avgRating){
            spot.avgStarRating = avgStarRating[0].avgRating
        } else spot.avgStarRating = 0
        if(spotImage[0]) spot.SpotImages = spotImage

    return res.json(spot)
    } else{
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    } // seems to be working on local
})

// create a spot
router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const { user } = req
    const ownerId = user.toSafeObject().id

    const newSpot = await Spot.create({ownerId: ownerId, address: address, city: city, state: state,
    country: country, lat: lat, lng: lng, name: name, description: description, price: price})

    return res.json(newSpot) // working on local it seems
})

// add image to spot based on spot id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body
    const { spotId } = req.params
    const theSpot = await Spot.findByPk(spotId)
    const { user } = req
    const ownerId = user.toSafeObject().id

    // if(theSpot.ownerId === ownerId){
        if(theSpot){
            const image = await SpotImage.create({
            spotId,
            url,
            preview
            })
            await image.validate()
            res.json({id: spotId, url: url, preview: preview})
        } else {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
}) // seems to be working on local and heroku

// edit a spot
router.put('/:spotId', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { spotId } = req.params
    const { user } = req
    const ownerId = user.toSafeObject().id

    const theSpot = await Spot.findByPk(spotId)

    if(!theSpot){
        res.status(404)
        return res.json({
            message: `Spot couldn't be found`,
            statusCode: 404
        })
    }

    if(!address){
        res.status(400)
        return res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                "address": "Street address is required"
            }
        })
    }
    if(!city){
        res.status(400)
        return res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                "city": "City is required"
            }
        })
    }
    if(!state){
        res.status(400)
        return res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                "state": "State is required"
            }
        })
    }
    if(!country){
        res.status(400)
        return res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                "country": "Country is required"
            }
        })
    }
    if(!lat){
        res.status(400)
        return res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                "lat": "Latitude is not valid"
            }
        })
    }
    if(!lng){
        res.status(400)
        return res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                "lng": "Longitude is not valid"
            }
        })
    }
    if(!name){
        res.status(400)
        return res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                "name": "Name must be less than 50 characters"
            }
        })
    }
    if(!description){
        res.status(400)
        return res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                "description": "Description is required"
            }
        })
    }
    if(!price){
        res.status(400)
        return res.json({
            message: 'Validation Error',
            statusCode: 400,
            errors: {
                "price": "Price per day is required"
            }
        })
    }

    if(theSpot.ownerId === ownerId){
    theSpot.set({
        ownerId: ownerId,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })
        await theSpot.save()
        return res.json(theSpot)
    } else {
        res.json('Must be owner to edit')
    }

}) // seems to be working on local and heroku

router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params
    const spotToBeDeleted = await Spot.findByPk(spotId)

    const { user } = req
    const ownerId = user.toSafeObject().id

    if(spotToBeDeleted.ownerId === ownerId){
    if(spotToBeDeleted){
        await spotToBeDeleted.destroy()
        res.json({
            message: 'Successfully deleted',
            statusCode: 200
        })
    } else {
        res.status(404)
        res.json({
            message: `Spot couldn't be found`,
            statusCode: 404
        })
    }
    } else{
        res.json('Spot must belong to current user to delete.')
    }
}) // seems to be working on local , not heroku


// create a review for a spot based on spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { review, stars } = req.body
    const { spotId } = req.params
    const theSpot = await Spot.findByPk(spotId)
    const { user } = req
    const userId = user.toSafeObject().id

    const reviews = await Review.findAll({
        where: { spotId: spotId}
    })
    // reviews[0] = reviews[0].toJSON()
        console.log(reviews)

    // if(reviews[0].userId === userId){

    for(let i = 0; i < reviews.length; i++){
        let eachObj = reviews[i]
        eachObj = eachObj.toJSON()

        if(eachObj.userId === userId){
        res.status(403)
        return res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
      }
    }

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

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

        if(theSpot){
            const newReview = await Review.create({
            userId,
            spotId,
            review,
            stars
            })
            await newReview.validate()
            res.json({id: newReview.id, userId: userId, spotId: spotId,
            review: review, stars: stars, createdAt: dateTime, updatedAt: dateTime})
        } else {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
}) // seems to be working on local

// get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params
    const theSpot = await Spot.findByPk(spotId)

    if(!theSpot){
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const theReviews = await Review.findAll({
        where: { spotId: spotId }
    })

    let user = await User.findAll({
        raw: true,
        where: { id: theReviews[0].userId },
        attributes: { exclude: ['username']}
    })

    let emptyArr = []
    for(let i = 0; i < theReviews.length; i++){
        let aReview = theReviews[i].toJSON()

        let user = await User.findAll({
            raw: true,
            where: { id: theReviews[i].userId },
            attributes: { exclude: ['username']}
        })

        let reviewImage = await ReviewImage.findAll({
            raw: true,
            where: { id: theReviews[i].id },
            attributes: { exclude: ['createdAt', 'updatedAt']}
        })

        if(user){
            aReview.User = user[0]
        }

        if(reviewImage.length){
            aReview.ReviewImages = reviewImage
        } else {
            aReview.ReviewImages = 'There are no review images'
        }

        emptyArr.push(aReview)
    }

    res.json({"Reviews": emptyArr})
}) // seems to be working on local




module.exports = router;
