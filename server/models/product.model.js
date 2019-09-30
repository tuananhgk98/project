var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var products = new Schema({
    id: String,
    name: String,
    type : Number,
    createOn : String,
    updateOn :  String,
    price : Number,
    quantity : Number,
    imageUrl : String,
}, { collection: 'Product' });

module.exports = mongoose.model('Product', products);