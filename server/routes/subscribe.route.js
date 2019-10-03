var express = require('express');
var router = express.Router();
var subscribeController = require('../controllers/subscribeUser.controller');
var cors = require('cors');
router.options('/', cors());

router.post('/add', cors(), subscribeController.subscribe);

module.exports = router;

