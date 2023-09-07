const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const {
  Spot,
  Review,
  SpotImage,
  User,
  ReviewImage,
  Booking
} = require("../../db/models");
const { ResultWithContextImpl } = require("express-validator/src/chain");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");

//GET ALL BOOKINGS BY CURRENT USER !!!WORKING!!!
router.get("/current", requireAuth, async (req, res, next) => {

    const bookings = await Booking.findAll({
        where: {userId: req.user.dataValues.id},
        include: {model: Spot,
        include: {model: SpotImage}}
    })

    if (!bookings) {
        res.status(404)
        return res.json({
            "message": "Spot couldn't be found"
          })
    }

    const bookingArray = [];
    bookings.forEach(booking => {
        bookingArray.push(booking.toJSON())
    })

    bookingArray.forEach(booking => {
        delete booking.Spot.createdAt
        delete booking.Spot.updatedAt
        booking.Spot.previewImage = booking.Spot.SpotImages[0].url
        delete booking.Spot.SpotImages
    })
    return res.json({"Bookings" : bookingArray})
});


module.exports = router;