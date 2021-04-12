'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, {
        foreignKey: 'UserId',
        targetKey: 'id',
      });
      Product.hasMany(models.Cart, {
        foreignKey: 'ProductId',
        sourceKey: 'id',
      });
      Product.hasMany(models.TransactionHistory, {
        foreignKey: 'ProductId',
        sourceKey: 'id',
      });
      Product.hasMany(models.Wishlist, {
        foreignKey: 'ProductId',
        sourceKey: 'id',
      });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Input name should not be empty',
          },
        },
      },
      image_url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Input image url should not be empty',
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Input price should not be empty',
          },
          isInt: {
            args: true,
            msg: 'Input price should be a number integer value',
          },
          notNegative(value) {
            if (value < 0) {
              throw new Error('Input price should not be a negative value');
            }
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            args: true,
            msg: 'Input stock should be a number integer value',
          },
          notNegative(value) {
            if (value < 0) {
              throw new Error('Input stock should not be a negative value');
            }
          },
        },
      },
      UserId: DataTypes.INTEGER,
      category: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (Product) => {
          if (!Product.stock) Product.stock = 0;
          if (!Product.category) Product.category = 'Uncategorized';
        },
      },
      sequelize,
      modelName: 'Product',
    }
  );
  return Product;
};
