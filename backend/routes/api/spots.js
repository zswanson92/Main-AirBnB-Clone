const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Review, Sequelize, User, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth')
const router = express.Router();


// get all spots
router.get('/', async (req, res) => {
    let { page, size } = req.query
    // COMMENT THESE LINES BACK IN AAFTER TESTING IS DONE!
    // if(!page){
    //     page = 1
    // }
    // if(!size){
    //     size = 20
    // }

    let pagination = {}
    if(parseInt(page) >= 1 && parseInt(size) >= 1){
        pagination.limit = size
        pagination.offset = size * (page - 1)
    }
    let aSpot = await Spot.findAll({
        ...pagination
    })

    let Spots = []
    for(let i = 0; i < aSpot.length; i++){
        let spot = aSpot[i].toJSON()

        let avgRating = await Review.findAll({
            raw: true,
            where: { spotId: aSpot[i].id},
            attributes: [[Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('stars')), 2), 'avgRating']]
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
    let spotss = {Spots}
    // COMMENT THESE LINES BACK IN AFTER TESTING IS DONE!
    // spotss.page = page
    // spotss.size = size
    return res.json(spotss)   // seems to be working on local
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

    let avgRating = await Review.findAll({
        raw: true,
        where: { spotId: specificSpot[i].id},
        attributes: [[Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('stars')), 2), 'avgRating']]
    })

    let spotImage = await SpotImage.findAll({
        raw: true,
        where: { spotId: specificSpot[i].id },
        attributes: { exclude: ['createdAt', 'updatedAt']}
    })


    if(avgRating[0].avgRating){
        spot.avgRating = avgRating[0].avgRating
    } else spot.avgRating = 0
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

        let avgRating = await Review.findAll({
            raw: true,
            where: { spotId: theSpot.id},
            attributes: [[Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('stars')), 2), 'avgRating']]
        })

        let numReviews = await Review.findAll({
            raw: true,
            where: { spotId: theSpot.id},
            attributes: [[Sequelize.fn('COUNT', Sequelize.col('review')), 'numReviews']]
        })

        let spotImage = await SpotImage.findAll({
            raw: true,
            where: { spotId: theSpot.id },
            attributes: { exclude: ['createdAt', 'updatedAt', 'spotId']}
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
        if(avgRating[0].avgRating){
            spot.avgRating = avgRating[0].avgRating
        } else spot.avgRating = 0
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
router.post('/:spotId/images', async (req, res) => {
    const { url, preview } = req.body
    // console.log('this is the preview', preview)
    const { spotId } = req.params
    const theSpot = await Spot.findByPk(spotId)
    // const { user } = req

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
})
// seems to be working on local and heroku

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

router.delete('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const spotToBeDeleted = await Spot.findByPk(spotId)

    const { user } = req
    const ownerId = user.toSafeObject().id

    if(spotToBeDeleted){
    if(spotToBeDeleted.ownerId === ownerId){
        await spotToBeDeleted.destroy()
        res.json({
            "message": 'Successfully deleted',
            "statusCode": 200
        })
    } else {
        res.json('Spot must belong to current user to delete.')
    }
    } else{
        res.status(404)
        res.json({
            "message": `Spot couldn't be found`,
            "statusCode": 404
        })
    }
})
// seems to be working on local , not heroku


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
        // console.log(reviews)

    // if(reviews[0].userId === userId){

    for(let i = 0; i < reviews.length; i++){
        let eachObj = reviews[i]
        eachObj = eachObj.toJSON()

    //     if(eachObj.userId === userId){
    //     res.status(403)
    //     return res.json({
    //         "message": "User already has a review for this spot",
    //         "statusCode": 403
    //     })
    //   }
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

    // if(stars !== 1 && stars !== 2 && stars !== 3 && stars !== 4 && stars !== 5){
    //     res.status(400)
    //     return res.json({
    //         "message": "Validation error",
    //         "statusCode": 400,
    //         "errors": { 'stars': 'Stars must be an integer from 1 to 5'}
    //        })
    // }

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
            attributes: { exclude: ['createdAt', 'updatedAt', 'reviewId']}
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

// create a booking from a spot based on spot id

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params
    const theSpot = await Spot.findByPk(spotId)
    const { user } = req
    const userId = user.toSafeObject().id
    const { startDate, endDate } = req.body
    // console.log(theSpot)

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    if(!theSpot){
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if(theSpot.dataValues.ownerId === userId){
        return res.json("Spot cannot belong to current user")
    }



    let inputStartDate = new Date(startDate)
    let inputEndDate = new Date(endDate)
    let inputStartDateToDateString = inputStartDate.toDateString()
    let inputEndDateToDateString = inputEndDate.toDateString()
    let realStartDate = new Date(inputStartDateToDateString)
    let realEndDate = new Date(inputEndDateToDateString)
    let realStartNum = realStartDate.getTime()
    let realEndNum = realEndDate.getTime()

     // console.log(realStartDate.getTime())
    // console.log(realEndDate.getTime())
    let aaa = await Booking.findAll({
        where: { spotId: spotId}
    })
    // console.log(aaa)

    for(let i = 0; i < aaa.length; i++){
        let theSpecificBooking = aaa[i]

        let abc = new Date(theSpecificBooking.dataValues.startDate)
        let xyz = new Date(theSpecificBooking.dataValues.endDate)
        let abcToDS = abc.toDateString()
        let xyzToDS = xyz.toDateString()
        let currentStateDate = new Date(abcToDS)
        let currentEndDate = new Date(xyzToDS)
        let currentStartNum = currentStateDate.getTime()
        let currentEndNum = currentEndDate.getTime()
        if(realStartNum === currentStartNum || (realStartNum > currentStartNum && realStartNum < currentEndNum) ||
        realStartNum === currentEndNum){
            res.status(403)
            res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
            "startDate": "Start date conflicts with an existing booking"
        }})
        }
        if(realEndNum === currentEndNum || (realEndNum < currentEndNum && realEndNum > currentStartNum) ||
        realEndNum === currentStartNum){
            res.status(403)
            res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
            "endDate": "End date conflicts with an existing booking"
        }})
        }

    }
    if(realEndDate.getTime() < realStartDate.getTime()){
        res.status(400)
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot be on or before startDate"
            }
        })
    }

    const newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate
    })
    await newBooking.validate()
    res.json({"id": newBooking.id, "spotId": spotId, "userId": userId, "startDate": startDate,
    "endDate": endDate, createdAt: dateTime, updatedAt: dateTime})


})

// get all bookings for a spot based on the spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) =>{
    const { spotId } = req.params
    const theSpot = await Spot.findByPk(spotId)
    const { user } = req
    const userId = user.toSafeObject().id


    if(theSpot){
    if(theSpot.ownerId !== userId){
        const theBookings = await Booking.findAll({
            where: { spotId: spotId},
            attributes: { exclude: ['id', 'userId', 'createdAt', 'updatedAt']}
        })
        return res.json({"Bookings": theBookings})
    } else {
        const theBookings = await Booking.findAll({
            where: { spotId: spotId }
        })

        let owner = await User.findAll({
            raw: true,
            where: { id: theSpot.ownerId },
            attributes: { exclude: ['username']}
        })
        // console.log(theBookings[0])
        theBookings[0].User = owner[0]

        return res.json({"Bookings": theBookings})
    }
    } else {
        res.status(404)
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

})


module.exports = router;
