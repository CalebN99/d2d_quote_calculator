const express = require('express');
const router = express.Router();
const path = require('path');
let reqPath = path.join(__dirname, '../../models');

const User = require(path.join(reqPath, "/quotes/quote_schema"));


router.get('/', (req, res) => {
    res.send("We are on quotes")

});







module.exports = router;
