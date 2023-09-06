const express = require('express');

const { Spot, Review, SpotImage} = require('../../db/models');
const { ResultWithContextImpl } = require('express-validator/src/chain');

const router = express.Router()



router.get('/', async (req, res, next) => {

const spots = await Spot.findAll({
    include: [
        {model: Review},
        {model: SpotImage}
    ]
})

if (!spots) {
    res.status(404)
    return res.json({
        "message": "Spot couldn't be found"
    })
}
let spotsList = [];
spots.forEach(element => {
    spotsList.push(element.toJSON());

});

spotsList.forEach(spot => {
    spot.Reviews.forEach(review => {
        let sum = 0
        sum += review.stars
        let avg = sum/spot.Reviews.length
        spot.avgRating = avg
    })
    delete spot.Reviews
})

spotsList.forEach(spot => {
    spot.SpotImages.forEach(image => {
        spot.previewImage = image.url
        if (!spot.previewImage) spot.previewImage = "No Image Found"
    })
    delete spot.SpotImages
})

return res.json({"Spots":spotsList})

});

module.exports = router;