var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var users = new Schema({
    fullName: String,
    email: String,
    hashedPassword: String,
    phone: Number,
    birthday: String,
    address: String,
    avatar : String,
    createOn : String,
    updateOn : String
  

}, { collection: 'User' });

module.exports = mongoose.model('User', users);