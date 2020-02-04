const express = require('express');
const Tour = require('../models/Tour');

const router = express.Router();

router.get('/', async (req, res)=>{
    const tours = await Post.find({});
    res.status(200).json(tours);
});

router.post('/', async (req,res)=>{
    const TourData = {
        title: req.body.title,
        place: req.body.place,
        desc: req.body.desc,
        seats: req.body.seats,
        price: req.body.price,
        img: req.body.img,
    };

    const tour = new Tour(TourData);

    await tour.save();
    res.status(201).json(tour);
});

router.delete('/:tourID', async (req,res)=>{
    await Tour.delete({_id: req.params.tourID })

    res.status(200).json({
        messege: 'Удалено'
    })
});

module.exports = router;