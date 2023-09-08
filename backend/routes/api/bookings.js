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
        booking.startDate = new Date(booking.startDate).toISOString().split('T')[0];
        booking.endDate = new Date(booking.endDate).toISOString().split('T')[0];
        delete booking.Spot.description
        delete booking.Spot.createdAt
        delete booking.Spot.updatedAt
        booking.Spot.previewImage = booking.Spot.SpotImages[0].url
        delete booking.Spot.SpotImages
    })
    return res.json({"Bookings" : bookingArray})
});

//DELETE A BOOKING !!!WORKING!!!
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
// if (new Date(booking.startDate) >= Date.now()) {
//     res.status(403)
//     return res.json({
//         "message": "Bookings that have been started can't be deleted"
//       })
// }


await booking.destroy()

return res.json({
    "message": "Successfully deleted"
  })
});
const validateBooking = [
    check('endDate')
    .custom(async (endDate, {req}) => {
    if (new Date(endDate).getTime() < new Date(req.body.startDate).getTime())
  throw new Error("endDate cannot be on or before startDate")}),
    handleValidationErrors,
  ];

//EDIT A BOOKING NEED VALIDATIONS********************************
router.put('/:id', requireAuth, validateBooking, async (req, res, next) => {
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

      await booking.save()

      start.toISOString().split('T')[0];
      end.toISOString().split('T')[0];

return res.json(booking)

});

module.exports = router;