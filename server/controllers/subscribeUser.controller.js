/*jshint esversion: 6 */
var subscribeUsers = require('../models/subscribeUser.model');
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const CircularJSON = require('circular-json');

mongoose.connect('mongodb://localhost:27017/project5', { useNewUrlParser: true });


module.exports.subscribe = function (req, res) {
    var data = { mail } = req.body;
    subscribeUsers.create(data).then(res => {
        res.status(200).send({
            OK: true,
            Message: 'subscribe successfully!!',
            data: res
        });
    }).catch(err => res.status(500).send(JSON.stringify(err)));
};