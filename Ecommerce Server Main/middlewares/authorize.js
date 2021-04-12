const { Product, Banner, Cart, Wishlist } = require('../models');

const authorizeProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const UserId = req.decoded.id;

    const data = await Product.findOne({
      where: { id },
      include: ['User'],
    });

    if (!data)
      throw {
        status: 404,
        msg: 'Id not found',
      };

    if (data.UserId !== UserId)
      throw {
        status: 401,
        msg: 'Not authorized',
      };

    next();
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ msg: err.msg });
    } else if (err.status === 401) {
      res.status(401).json({ msg: err.msg });
    } else {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
};

const authorizeBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const UserId = req.decoded.id;

    const data = await Banner.findOne({
      where: { id },
      include: ['User'],
    });

    if (!data)
      throw {
        status: 404,
        msg: 'Id not found',
      };

    if (data.UserId !== UserId)
      throw {
        status: 401,
        msg: 'Not authorized',
      };

    next();
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ msg: err.msg });
    } else if (err.status === 401) {
      res.status(401).json({ msg: err.msg });
    } else {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
};

const authorizeCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const UserId = req.decoded.id;

    const data = await Cart.findOne({
      where: { id },
      include: ['User'],
    });

    if (!data)
      throw {
        status: 404,
        msg: 'Id not found',
      };

    if (data.UserId !== UserId)
      throw {
        status: 401,
        msg: 'Not authorized',
      };

    next();
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ msg: err.msg });
    } else if (err.status === 401) {
      res.status(401).json({ msg: err.msg });
    } else {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
};

const authorizeWishlist = async (req, res, next) => {
  try {
    const { id } = req.params;
    const UserId = req.decoded.id;

    const data = await Wishlist.findOne({
      where: { id },
      include: ['User'],
    });

    if (!data)
      throw {
        status: 404,
        msg: 'Id not found',
      };

    if (data.UserId !== UserId)
      throw {
        status: 401,
        msg: 'Not authorized',
      };

    next();
  } catch (err) {
    if (err.status === 404) {
      res.status(404).json({ msg: err.msg });
    } else if (err.status === 401) {
      res.status(401).json({ msg: err.msg });
    } else {
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  }
};

module.exports = { authorizeProduct, authorizeBanner, authorizeCustomer, authorizeWishlist };
