'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wishlist.belongsTo(models.Product, {
        foreignKey: 'ProductId',
        targetKey: 'id',
      });
      Wishlist.belongsTo(models.User, {
        foreignKey: 'UserId',
        targetKey: 'id',
      });
    }
  };
  Wishlist.init({
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};