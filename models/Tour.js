const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tourSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

const Tour = mongoose.model("tour", tourSchema);
module.exports = Tour;