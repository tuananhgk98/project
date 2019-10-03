/*jshint esversion: 6 */

const express = require('express');

const app = express();

const port = 3000;


const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json();
var mongoose = require('mongoose');

var cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


mongoose.connect('mongodb://localhost:27017/project5', { useNewUrlParser: true });
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS, DELETE");
    next();
});


var productRoute = require('./routes/product.route');
var mailRoute = require('./routes/mail.route');
var subscribeRoute = require('./routes/subscribe.route');



app.use('/product',productRoute);
app.use('/mail', mailRoute);
app.use('/subscribe',subscribeRoute);


app.get('/test', function (req, res) {
    res.status(200).send({
        success: true
    });
});

app.listen(port, () => console.log(`Server is listening on port ${port}!!!!`));


