var express = require('express');
var router = express.Router();
var productController = require('../controllers/product.controller');
var cors = require('cors');
router.options('/', cors());

router.get('/list', cors(), productController.getAllProduct);
router.post('/:id', cors(), productController.getOneProduct);

module.exports = router;

