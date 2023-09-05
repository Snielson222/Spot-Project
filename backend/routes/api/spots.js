const express = require('express');

const { Spot, Review, SpotImage} = require('../../db/models');
const { ResultWithContextImpl } = require('express-validator/src/chain');

const router = express.Router()

router.get('/', async (req, res, next) => {

const spots = await Spot.findAll()

if (!spots) {
    res.status(404)
    return res.json({
        "message": "Spot couldn't be found"
    })
}

// for (let i = 0; i < spots.length; i++) {
// const avgRating = await Review.findAll({
//     attributes: ['stars']
// })
// const previewImg = await SpotImage.findAll({
//     attributes: ['url']
// })
// spots.dataValues.avgRating = avgRating;
// spots.dataValues.previewImg = previewImg;
// }

return res.json(spots)

});

module.exports = router;