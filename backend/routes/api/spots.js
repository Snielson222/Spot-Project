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
const stars = await Review.findAll({
    attributes: ['stars']
})
console.log(spots)
console.log(stars)
spots.forEach(async element => {
//    element.dataValues.avgRating = avgRating.stars;
   element.dataValues.previewImg = 'previewImg';
});

return res.json(spots)

});

module.exports = router;