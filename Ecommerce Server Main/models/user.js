'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const { hashPass } = require('../helpers/bcrypt.js');
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product, {
        foreignKey: 'UserId',
        sourceKey: 'id',
      });
      User.hasMany(models.Banner, {
        foreignKey: 'UserId',
        sourceKey: 'id',
      });
      User.hasMany(models.Cart, {
        foreignKey: 'UserId',
        sourceKey: 'id',
      });
      User.hasMany(models.TransactionHistory, {
        foreignKey: 'UserId',
        sourceKey: 'id',
      });
      User.hasMany(models.Wishlist, {
        foreignKey: 'UserId',
        sourceKey: 'id',
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email format',
          },
        },
        unique: {
          args: true,
          msg: 'Email already registered',
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Input password should not be empty',
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (User) => {
          if (!User.role) User.role = 'customer';
          User.password = hashPass(User.password);
        },
      },
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
