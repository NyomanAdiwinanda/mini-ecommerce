const { User } = require('../models');
const jwt = require('jsonwebtoken');

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.access_token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY_ADMIN);

    const checkId = await User.findByPk(decoded.id);

    if (!checkId)
      throw {
        name: 'CustomError',
        msg: 'Id not found',
        status: 404,
      };

    req.decoded = decoded;

    next();
  } catch (err) {
    if (!err.msg) {
      next({
        name: 'CustomError',
        msg: 'Invalid token',
        status: 401,
      });
    } else {
      next(err);
    }
  }
};

const authenticateCustomer = async (req, res, next) => {
  try {
    const token = req.headers.access_token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY_CUSTOMER);

    const checkId = await User.findByPk(decoded.id);

    if (!checkId)
      throw {
        name: 'CustomError',
        msg: 'Id not found',
        status: 404,
      };

    req.decoded = decoded;

    next();
  } catch (err) {
    if (!err.msg) {
      next({
        name: 'CustomError',
        msg: 'Invalid token',
        status: 401,
      });
    } else {
      next(err);
    }
  }
};

module.exports = { authenticateAdmin, authenticateCustomer };
