var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var subscribeUsers = new Schema({
    mail: String,
}, { collection: 'SubscribeUser' });

module.exports = mongoose.model('SubscribeUser', subscribeUsers);