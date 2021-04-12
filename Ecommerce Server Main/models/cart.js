'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'UserId',
        targetKey: 'id',
      });
      Cart.belongsTo(models.Product, {
        foreignKey: 'ProductId',
        targetKey: 'id',
      });
    }
  }
  Cart.init(
    {
      total_price: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Total price should not be empty',
          },
          isInt: {
            args: true,
            msg: 'Total price should be a number integer value',
          },
          notNegative(value) {
            if (value < 0) {
              throw new Error('Total price should not be a negative value');
            }
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Quantity should not be empty',
          },
          isInt: {
            args: true,
            msg: 'Quantity should be a number integer value',
          },
          notNegative(value) {
            if (value < 0) {
              throw new Error('Quantity should not be a negative value');
            }
          },
        },
      },
      ProductId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Cart',
    }
  );
  return Cart;
};
