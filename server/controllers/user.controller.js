/*jshint esversion: 6 */
var users = require('../models/user.model');
var mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;
const CircularJSON = require('circular-json');

mongoose.connect('mongodb://localhost:27017/project5');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


module.exports.signup = function (req, res) {
    let data = {
        "fullName": req.body.fullName,
        "email": req.body.email,
        "hashedPassword": req.body.hashedPassword,
        "phone": req.body.phone,
        "birthday": req.body.birthday,
        "address": req.body.address,
        "avatar": req.body.avatar,
        "createOn": req.body.createOn,
    };

    let allEmail = users.find({}).select("email");

    allEmail.exec(function (err, someValue) {
        if (err) return next(err);
        //    if(req.body.email)
        let arrMail = someValue.map(i => i.email);
        console.log(arrMail);
        if (arrMail.includes(req.body.email)) {
            res.send({
                OK: false,
                Message: "Email da ton tai"
            });
        }
        else {
            users.create(data).then(data => {
                res.status(200).send({
                    OK: true,
                    Message: 'signup successful!!',
                    data: data
                });
            }).catch(err => res.status(500).send({
                OK: false,
                Message: JSON.stringify(err),
                 
            }));
        }
    });

};

module.exports.signin = function (req, res){
    let input = {
        email : req.body.email,
        hashedPassword : req.body.hashedPassword
    };
   users.find(function(err, data){
    if (err) return console.log(err);
    let index = data.findIndex(function(i){
        return i.email ===  input.email;
    });
   if(index !== -1 && input.hashedPassword == data[index].hashedPassword){
       res.send({
           OK :true,
           Message : "login ok",
           data : data[index]
       });
   }
   else{
       res.send({
           OK : false, 
           Message : "login error, email or password is incorrect!! please try agin"
       });
   }
   });
};

module.exports.getAllUserEmail = function (req, res){

    users.find( (err, data) => {
        if(err){
            res.send({
                OK : false,
                Message : err
            });
        }
        else{
            let arrEmail = data.map( i => i.email);
            res.send({
                OK:true,
                Message : "successful",
                data : arrEmail
            });
        }
    } );
};