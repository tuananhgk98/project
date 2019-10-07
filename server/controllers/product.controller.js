/*jshint esversion: 6 */
var products = require('../models/product.model');
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;

mongoose.createConnection('mongodb://localhost:27017/project5');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


module.exports.getAllProduct = function (req, res) {
    products.find(function (err, data) {
        if (err) return console.log(err);
        res.status(200).send({
            OK: true,
            Message: "Get all products successfully!!",
            data: data
        });
    });
};


module.exports.updateProduct = function (req, res) {

    let data = {
        "name" : req.body.name,
        "description" : req.body.description,
        "price" : req.body.price,
        "quantity" : req.body.quantity,
        "createOn" : req.body.createOn,
        "updateOn" : req.body.updateOn,
        "imageString" : req.body.imageString,
        "status" : 1
    };

    products.findOneAndUpdate({ _id: req.params.id }, data, { new: true }).then(pro => {

        res.status(200).send({
            OK: true,
            Message: "Update successfuly!!",
            data: pro
        });

    });

};

module.exports.deleteProduct = function (req, res) {
    let query = {
        "id" : req.body.id
    };
      products.deleteOne(query).then(function(){
          res.status(200).send({
              OK : true,
              Message : "delete success",
              data : null
          });
      }).catch(function(err){
          res.status(500).send({
              OK : false,
              Message : "err",
              data : JSON.stringify(err)
          });
      });
  };

module.exports.createProduct = function (req, res) {
    let data = {
        "name" : req.body.name,
        "description" : req.body.description,
        "price" : req.body.price,
        "quantity" : req.body.quantity,
        "createOn" : req.body.createOn,
        "updateOn" : req.body.updateOn,
        "imageString" : req.body.imageString,
        "status" : 1
    };
    products.create(data).then(data => {
        res.status(200).send({
            OK: true,
            Message: 'create successfully!!',
            data: data
        });
    }).catch(err => res.status(500).send({
        OK : false,
        Message : 'error',
        data : JSON.stringify(err)
    }));
};

module.exports.getOneProduct = function (req, res) {
    products.findOne({ _id: req.body.id }, function (err, data) {
        if (err) res.send(json(err));
        res.status(200).send({
            OK: true,
            Message: "get one product successfully!",
            data: data
        });
    });

};




