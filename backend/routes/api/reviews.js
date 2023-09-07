const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Spot, Review, SpotImage, User, ReviewImage} = require("../../db/models");
const { ResultWithContextImpl } = require("express-validator/src/chain");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");


router.get("/current", requireAuth, async (req, res, next) => {
    const reviews = await Review.findAll({
      where: { userId: req.user.dataValues.id },
      include: [{ model: User }, {model: Spot,
    include: {model: SpotImage}}, {model: ReviewImage}],
    });

    if (!reviews) {
        res.status(404)
        return res.json({
            message: "No reviews found for the current user"
        })
    };

    const reviewArray = [];

    reviews.forEach(review => {
        reviewArray.push(review.toJSON())
    });

    reviewArray.forEach(review => {
        delete review.User.username
        delete review.Spot.createdAt
        delete review.Spot.updatedAt
        review.Spot.previewImage = review.Spot.SpotImages[0].url
        delete review.Spot.SpotImages
        review.ReviewImages.forEach(image => {
            delete image.reviewId
            delete image.createdAt
            delete image.updatedAt
        })
    });

    return res.json({Reviews : reviewArray})

});


module.exports = router;