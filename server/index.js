const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require('dotenv/config');


//Route imports

const quoteRoute = require('./routes/quotes/quote_routes')
const accountRoute = require('./routes/accounts/admin_routes');
const bodyParser = require("body-parser");
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(bodyParser.json())

// mongoose.set('strictQuery', true);
// mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => {
//     console.log("Successful Connection to MongoDB")
// })

app.use('/quotes', quoteRoute);
app.use('/accounts', accountRoute);

app.get("/", (req, res) => {
    res.send("We are on home")
})



//Connect to Database





app.listen(8000, () => {
    console.log("Server listening on port 8000")
});