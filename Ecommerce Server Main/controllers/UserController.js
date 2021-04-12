const { User } = require('../models');
const { comparePass } = require('../helpers/bcrypt.js');
const {
  generateTokenAdmin,
  generateTokenCustomer,
} = require('../helpers/jwt.js');

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      const newUser = {
        email,
        password,
      };

      const data = await User.create(newUser);

      if (!data) throw err;

      res.status(201).json({
        msg: 'Register success',
        id: data.id,
        email: data.email,
        role: data.role,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const data = await User.findOne({
        where: { email },
      });

      if (!data)
        throw {
          name: 'CustomError',
          msg: 'Invalid Email or Password',
          status: 400,
        };

      const comparePassword = await comparePass(password, data.password);

      if (!comparePassword)
        throw {
          name: 'CustomError',
          msg: 'Invalid Email or Password',
          status: 400,
        };

      if (data.role === 'admin') {
        const access_token = generateTokenAdmin({
          id: data.id,
          email: data.email,
          role: data.role,
        });

        res.status(200).json({
          id: data.id,
          email: data.email,
          role: data.role,
          access_token,
        });
      } else {
        const access_token = generateTokenCustomer({
          id: data.id,
          email: data.email,
          role: data.role,
        });

        res.status(200).json({
          id: data.id,
          email: data.email,
          role: data.role,
          access_token,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
