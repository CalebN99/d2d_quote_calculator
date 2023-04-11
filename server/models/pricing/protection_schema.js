const mongoose = require('mongoose')

const ProtPrice = mongoose.Schema({
    wheels: {type: Number, required: true},
    paint: {type: Number, required: true},
    windshield: {type: Number, required: true},
    allWindows: {type: Number, required: true},
    trimLights: {type: Number, required: true},
})



module.exports = mongoose.model('ProtPrice', ProtPrice);