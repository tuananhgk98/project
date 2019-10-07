/*jshint esversion: 6 */
var discountCode = require('../models/discountCode.model');
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const CircularJSON = require('circular-json');

mongoose.connect('mongodb://localhost:27017/project5', { useNewUrlParser: true });


module.exports.findCode = function (req, res) {
    discountCode.findOne({ _id: req.body.id }, function (err, data) {
        if (err) return res.status(404).send({
            OK : false,
            Message : "error",
            data : JSON.stringify(err)
        });
        res.status(200).send({
            OK: true,
            Message: "get code successfully!",
            data: data
        });
    });

};