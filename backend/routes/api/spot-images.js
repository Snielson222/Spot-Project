const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { Spot, Review, SpotImage, User } = require("../../db/models");
const { ResultWithContextImpl } = require("express-validator/src/chain");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");


//DELETE AN IMAGE FOR A SPOT !!!WORKING!!!
router.delete("/:imageId", requireAuth, async (req, res, next) => {

    const image = await SpotImage.findOne({
        where: {spotId: req.params.imageId},
        include: {model: Spot}
})
  
    if (!image) {
      res.status(404);
      return res.json({
        message: "Spot Image couldn't be found",
      });
    };
    if (req.user.dataValues.id != image.Spot.ownerId) {
      res.status(401);
      return res.json({
        message: "Spot must belong to the current user",
      });
    };
  
    await image.destroy();
  
    return res.json({
      "message": "Successfully deleted"
    })
  });

  module.exports = router;