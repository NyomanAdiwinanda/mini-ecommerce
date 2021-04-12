const jwt = require('jsonwebtoken');

const generateTokenAdmin = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY_ADMIN);
};

const generateTokenCustomer = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY_CUSTOMER);
};

module.exports = { generateTokenAdmin, generateTokenCustomer };
