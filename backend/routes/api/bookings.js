const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Sequelize, User, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { route } = require('./session');

const router = express.Router();

// get all of the current user's bookings
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const userId = user.toSafeObject().id


    const theBookings = await Booking.findAll({
        where: { userId: userId}
    })

    let emptyArr = []
    for(let i = 0; i < theBookings.length ; i++){
        const aBooking = theBookings[i].toJSON()

        const theSpot = await Spot.findAll({
            where: { id: aBooking.spotId},
            attributes: { exclude: ['createdAt', 'updatedAt']}
        })
        let spotImage = await SpotImage.findAll({
            raw: true,
            where: { spotId: theSpot[0].id },
            attributes: { exclude: ['createdAt', 'updatedAt']}
        })

        let abc = theSpot[0].toJSON()
        abc.previewImage = spotImage[0].url

        aBooking.Spot = abc

        emptyArr.push(aBooking)
    }
    return res.json({"Bookings": emptyArr})
})

router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body
    const { bookingId } = req.params
    const theBooking = await Booking.findByPk(bookingId)
    const { user } = req
    const userId = user.toSafeObject().id

    if(!theBooking){
        res.status(404)
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    let inputStartDate = new Date(startDate)
    let inputEndDate = new Date(endDate)
    let inputStartDateToDateString = inputStartDate.toDateString()
    let inputEndDateToDateString = inputEndDate.toDateString()
    let realStartDate = new Date(inputStartDateToDateString)
    let realEndDate = new Date(inputEndDateToDateString)
    let realStartNum = realStartDate.getTime()
    let realEndNum = realEndDate.getTime()

    if(realEndNum < realStartNum){
        res.status(400)
        res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
              "endDate": "endDate cannot be on or before startDate"
            }
        })
    }

    let abc = new Date(theBooking.startDate)
    let xyz = new Date(theBooking.endDate)
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


    if(theBooking.userId === userId){
        theBooking.set({
            startDate: startDate,
            endDate: endDate
        })
        await theBooking.save()
        return res.json(theBooking)
    } else {
        res.json('Must be owner to edit')
    }

})

// delete an existing booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params
    const theBooking = await Booking.findByPk(bookingId)
    const { user } = req
    const userId = user.toSafeObject().id


    if(!theBooking){
        res.status(404)
        return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    const theSpot = await Spot.findByPk(theBooking.spotId)
    console.log(userId)
    console.log(theSpot.ownerId)

    if(theBooking.userId !== userId && userId !== theSpot.ownerId){
        return res.json("Booking or Spot must belong to current user")
    }

    await theBooking.destroy()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
