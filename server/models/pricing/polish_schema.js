const mongoose = require('mongoose')

const PolishPrice = mongoose.Schema({
    size: {type: String, required: true},
    enhancement: {type: Number, required: true},
    oneStep: {type: Number, required: true},
    twoStep: {type: Number, required: true},
 
})



module.exports = mongoose.model('PolishPrice', PolishPrice);