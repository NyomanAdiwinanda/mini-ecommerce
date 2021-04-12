const router = require('express').Router();
const BannerController = require('../controllers/BannerController.js');
const { authenticateAdmin } = require('../middlewares/authenticate.js');
const { authorizeBanner } = require('../middlewares/authorize.js');

router.get('/', BannerController.getBanner);

router.use(authenticateAdmin);

router.post('/', BannerController.createBanner);

router.use('/:id', authorizeBanner);

router.put('/:id', BannerController.editBanner);

router.delete('/:id', BannerController.deleteBanner);

module.exports = router;
