var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var discountCode = new Schema({
    discount: Number,
}, { collection: 'DiscountCode' });

module.exports = mongoose.model('DiscountCode', discountCode);