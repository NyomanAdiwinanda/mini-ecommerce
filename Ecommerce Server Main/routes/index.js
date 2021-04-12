const router = require('express').Router();
const users = require('./users.js');
const products = require('./products.js');
const banners = require('./banners.js');
const carts = require('./carts.js');
const transactionHistories = require('./transactionHistories.js');
const wishlists = require('./wishlists.js');

router.use('/users', users);

router.use('/products', products);

router.use('/banners', banners);

router.use('/carts', carts);

router.use('/transactionHistories', transactionHistories);

router.use('/wishlists', wishlists);

module.exports = router;
