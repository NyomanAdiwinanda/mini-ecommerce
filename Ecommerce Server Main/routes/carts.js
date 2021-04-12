const router = require('express').Router();
const CartController = require('../controllers/CartController.js');
const { authenticateCustomer } = require('../middlewares/authenticate.js');
const { authorizeCustomer } = require('../middlewares/authorize.js');

router.use(authenticateCustomer);

router.post('/', CartController.createCart);

router.get('/', CartController.getCart);

router.use('/:id', authorizeCustomer);

router.patch('/:id', CartController.changeQuantity);

router.delete('/:id', CartController.deleteCart);

module.exports = router;
