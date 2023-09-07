const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Spot, Review, SpotImage, User, ReviewImage } = require("../../db/models");
const { ResultWithContextImpl } = require("express-validator/src/chain");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");

//DELETE AN IMAGE FOR A REVIEW !!!WORKING!!!
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const image = await ReviewImage.findOne({
    where: { reviewId: req.params.imageId },
    include: {model: Review}
  });

  if (!image) {
    res.status(404);
    return res.json({
      message: "Review Image couldn't be found",
    });
  }
  if (req.user.dataValues.id != image.Review.userId) {
    res.status(404);
    return res.json({
      message: "Review must belong to the current user",
    });
  }

  await image.destroy();

  return res.json({
    message: "Successfully deleted",
  });
});

module.exports = router;
