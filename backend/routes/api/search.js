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


    const theSpot = await Spot.findAll({
        where: {
            name: {
                [Op.substring]: req.query.spots
            }
        }
    })

    console.log("THIS IS THE SPOT!!!", theSpot)

    return res.json(theSpot)
})



module.exports = router;
