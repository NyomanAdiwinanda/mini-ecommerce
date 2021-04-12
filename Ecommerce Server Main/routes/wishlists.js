const router = require('express').Router();
const WishlistController = require('../controllers/WishlistController.js');
const { authenticateCustomer } = require('../middlewares/authenticate.js');
const { authorizeWishlist } = require('../middlewares/authorize.js');

router.use(authenticateCustomer);

router.post('/', WishlistController.createWishlist);

router.get('/', WishlistController.getWishlist);

router.use('/:id', authorizeWishlist);

router.delete('/:id', WishlistController.deleteWishlist);

module.exports = router;
