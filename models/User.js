const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

const User = mongoose.model("user", userSchema);
module.exports = User;