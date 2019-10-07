var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var products = new Schema({
    id: String,
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    createOn: String,
    updateOn: String,
    imageString: String,
    status : Number

}, { collection: 'Product' });

module.exports = mongoose.model('Product', products);