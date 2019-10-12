var express = require('express');
var router = express.Router();
var productController = require('../controllers/product.controller');
var cors = require('cors');
router.options('/', cors());
router.post('/update/:id', cors(), productController.updateProduct);
router.post('/remove', cors(), productController.deleteProduct);
router.post('/add', cors(), productController.createProduct);
router.get('/list', cors(), productController.getAllProduct);
router.post('/:id', cors(), productController.getOneProduct);
router.post('/increeView/:id', productController.increeViewCont);



module.exports = router;

