const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const {
  Spot,
  Review,
  SpotImage,
  User,
  ReviewImage,
} = require("../../db/models");
const { ResultWithContextImpl } = require("express-validator/src/chain");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");


//GET REVIEWS FOR CURRENT USER !!!WORKING!!!
router.get("/current", requireAuth, async (req, res, next) => {
  const reviews = await Review.findAll({
    where: { userId: req.user.dataValues.id },
    include: [
      { model: User },
      { model: Spot, include: { model: SpotImage } },
      { model: ReviewImage },
    ],
  });
  console.log(reviews)

  if (!reviews) {
    res.status(404);
    return res.json({
      message: "No reviews found for the current user",
    });
  }
  const reviewArray = [];

  reviews.forEach(review => {
    reviewArray.push(review.toJSON());
  });

  reviewArray.forEach((review) => {
    delete review.User.username;
    delete review.Spot.createdAt;
    delete review.Spot.updatedAt;
    review.Spot.SpotImages.forEach(image => {
    review.Spot.previewImage = image.url;
})
    delete review.Spot.SpotImages;
    review.ReviewImages.forEach((image) => {
      delete image.reviewId;
      delete image.createdAt;
      delete image.updatedAt;
    });
  });
  return res.json({ "Reviews": reviewArray });
});

//ADD AN IMAGE TO A REVIEW BASED ON REVIEWID
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
  const { url } = req.body;

  const testReview = await Review.findByPk(req.params.reviewId, {
    include: { model: ReviewImage },
  });
  if (!testReview) {
    res.status(404);
    return res.json({
      message: "Review couldn't be found",
    });
  }
  if (testReview.ReviewImages.length > 10) {
    res.status(403);
    return res.json({
      message: "Maximum number of images for this resource was reached",
    });
  }
  if (testReview.userId != req.user.dataValues.id) {
    res.status(401);
    return res.json({ message: "Review must belong to the current user" });
  }
  console.log(testReview);
  const newImage = await ReviewImage.build({
    reviewId: req.params.reviewId,
    url,
  });
  await newImage.save();

  const image = newImage.toJSON();

  delete image.reviewId;
  delete image.createdAt;
  delete image.updatedAt;
  res.json(image);
});

const validateReview = [
  check("review")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5")
    .notEmpty()
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

//EDIT A REVIEW FOR A SPOT !!!WORKING!!!
router.put("/:spotId(\\d+)", requireAuth, validateReview, async (req, res, next) => {
    const { review, stars } = req.body;
    const editReview = await Review.findByPk(req.params.spotId);
    

    if (!editReview) {
        res.status(404)
        return res.json({
            "message": "Review couldn't be found"
          })
    }
    if (editReview.userId != req.user.dataValues.id){
        res.status(401);
        return res.json({ message: "Review must belong to the current user" });
    }


    if (review) {
        editReview.review = review
    }
    if (stars) {
        editReview.stars = stars
    }
    await editReview.save()

    res.json(editReview)
});

//DELETE A REVIEW
router.delete("/:spotId(\\d+)", requireAuth, async (req, res, next) => {
    const editReview = await Review.findByPk(req.params.spotId);
    

    if (!editReview) {
        res.status(404)
        return res.json({
            "message": "Review couldn't be found"
          })
    }
    if (editReview.userId != req.user.dataValues.id){
        res.status(401);
        return res.json({ message: "Review must belong to the current user" });
    }

    await editReview.destroy({
        "message": "Successfully deleted"
      });

    res.json({
        "message": "Successfully deleted"
      })
})
module.exports = router;
