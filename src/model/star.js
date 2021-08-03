const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
    rating:{
        type: Number,
        default: 1
    },
    date:{
        type: Date,
        default: Date.now,
    }

})

const star = new mongoose.model("star", ratingSchema);
module.exports = star;

