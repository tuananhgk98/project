var express = require('express');
var router = express.Router();
var mailController = require('../controllers/mail.controller');
var cors = require('cors');
router.options('/', cors());


router.post('/sendSubscribeMail', mailController.sendSubscribeEmail);
module.exports = router;