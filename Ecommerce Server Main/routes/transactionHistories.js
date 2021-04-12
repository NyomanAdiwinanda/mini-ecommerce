const router = require('express').Router();
const TransactionHistoryController = require('../controllers/TransactionHistoryController.js');
const { authenticateCustomer } = require('../middlewares/authenticate.js');

router.use(authenticateCustomer);

router.post('/', TransactionHistoryController.createTransactionHistory);

router.get('/', TransactionHistoryController.getTransactionHistory);

module.exports = router;
