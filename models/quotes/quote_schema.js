const mongoose = require('mongoose')

const Quote = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    number: {type: String, required: true},
    carSize: {type: String, required: true},
    waterspots: {type: Boolean, required: true, default: false},
    swirls: {type: Boolean, required: true, default: false},
    scratches: {type: Boolean, required: true, default: false},
    protection: {type: [String], required: true, default: []},
    priceEstimation: {type: Number, requird: true},
    emailList: {type: Boolean, required: true, default: false},
    dateCreated: {type: Date, default: Date.now}, 
    notes: {type: String, required: false, default: ""},
    referer: {type: String, required: true},
    contactMe: {type: Boolean, required: true}
})



module.exports = mongoose.model('Quote', Quote);