const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require('dotenv/config');


//Route imports

const quoteRoute = require('./routes/quotes/quote_routes');
const accountRoute = require('./routes/accounts/admin_routes');
const pricingRoute = require('./routes/pricing/pricing_routes');
const bodyParser = require("body-parser");

const hi = "";
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            
   optionSuccessStatus:200,
}

app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });


app.use(cors(corsOptions)) 

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: false
}))

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, () => {
    console.log("Successful Connection to MongoDB")
})

app.use('/' + process.env.API_KEY + '/quotes', quoteRoute);
app.use('/' + process.env.API_KEY + '/accounts', accountRoute);
app.use('/' + process.env.API_KEY + '/pricing', pricingRoute);


app.use(express.static("./d2d_quote_calculator/build"));

//Connect to Database

let port = process.env.PORT || 8000

app.listen(port, () => {
    console.log("Server listening on port 8000")
});