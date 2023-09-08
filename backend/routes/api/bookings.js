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

//DELETE A BOOKING NEED BOOKINGS THAT HAVE BEEN STARTED CANT BE DELEATED
router.delete('/:id', requireAuth, async (req, res, next) => {
const booking = await Booking.findByPk(req.params.id)

if (!booking) {
    res.status(404)
    return res.json({
        "message": "Booking couldn't be found"
      })
}
if (booking.userId != req.user.dataValues.id) {
    res.status(403)
    return res.json("Booking must belong to the current user")
};
if (new Date(booking.startDate) >= Date.now()) {
    res.status(403)
    return res.json({
        "message": "Bookings that have been started can't be deleted"
      })
}


await booking.destroy()

return res.json({
    "message": "Successfully deleted"
  })
});

//EDIT A BOOKING NEED VALIDATIONS and BOOKING CONFLICT and BOOKING PAST END DATE
router.put('/:id', requireAuth, async (req, res, next) => {
    const {startDate, endDate} = req.body;

    const booking = await Booking.findByPk(req.params.id)

    const allBookings = await Booking.findAll({
        where: { 'id': req.params.id },
        include: { model: Spot },
      });

if (!booking) {
    res.status(404)
    return res.json({
        "message": "Booking couldn't be found"
      })
}
if (booking.userId != req.user.dataValues.id) {
    res.status(401)
    return res.json("Booking must belong to the current user")
};

const start = new Date(startDate);
const end = new Date(endDate);

if (Date.now() > end) {
    res.status(403)
    return res.json({
        "message": "Past bookings can't be modified"
      })
}

const bookingArray = [];
    allBookings.forEach((booking) => {
      bookingArray.push(booking.toJSON());
    });
    
  console.log(bookingArray, "*******************")
      bookingArray.forEach((booking) => {
        if (
          start.getTime() >= booking.startDate.getTime() &&
          end.getTime() <= booking.endDate.getTime()
        ) {
          res.status(403);
          return res.json({
            message:
              "Sorry, this spot is already booked for the specified dates",
            errors: {
              startDate: "Start date conflicts with an existing booking",
              endDate: "End date conflicts with an existing booking",
            },
          });
        }
      });

booking.startDate = startDate;
booking.endDate = endDate
await booking.save()

return res.json(booking)

});

module.exports = router;