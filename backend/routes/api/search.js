const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, SpotImage, Sequelize, User, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");
const { route } = require('./session');

const router = express.Router();

router.get(`/`, async (req, res) => {

    let theSpot;

    if (req.query.spots.split('=')[1] === 'name') {
        theSpot = await Spot.findAll({
            where: {
                name: { [Op.substring]: req.query.spots.split('?')[0] }
            }
        })
    }

    if (req.query.spots.split('=')[1] === 'city') {
        theSpot = await Spot.findAll({
            where: {
                city: { [Op.substring]: req.query.spots.split('?')[0] }
            }
        })
    }

    if (req.query.spots.split('=')[1] === 'address') {
        theSpot = await Spot.findAll({
            where: {
                address: { [Op.substring]: req.query.spots.split('?')[0] }
            }
        })
    }


    if (theSpot.length > 0) {
        // let spot = theSpot.toJSON()
        // theSpot.map(async (el) => {
        //     let spotImage = await SpotImage.findAll({
        //         // raw: true,
        //         where: {
        //             spotId: el.id
        //         }
        //     })
        //     el.img = spotImage
        //     // return el
        // })

        for (let i = 0; i < theSpot.length; i++) {
            theSpot[i].lat = await SpotImage.findAll({
                where: {
                    spotId: theSpot[i].id
                }
            })
        }
    }


    return res.json(theSpot)
})



module.exports = router;
