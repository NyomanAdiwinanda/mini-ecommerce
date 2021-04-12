const router = require('express').Router();
const ProductController = require('../controllers/ProductController.js');
const { authenticateAdmin } = require('../middlewares/authenticate.js');
const { authorizeProduct } = require('../middlewares/authorize.js');

router.get('/', ProductController.getProduct);

router.use(authenticateAdmin);

router.post('/', ProductController.createProduct);

router.use('/:id', authorizeProduct);

router.put('/:id', ProductController.editProduct);

router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
