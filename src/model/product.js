const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true,
    },
    Selling_price:{
        type: Number,
        required: true,
    },
    Discount:{
        type: Number,
        required: true,
    },
    Description:{
        type: String,
        required: true,
    },
    Image:{
        type: String,
        required: true,
    },
    Size:{
        type: String,
        required: true,
    }

})

const product = new mongoose.model("product", productSchema);
module.exports = product;

