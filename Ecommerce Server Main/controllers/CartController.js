const { Cart, Product } = require('../models');

class CartController {
  static async createCart(req, res, next) {
    try {
      const UserId = req.decoded.id;
      const { total_price, quantity, ProductId } = req.body;

      const newCart = {
        total_price,
        quantity,
        ProductId,
        UserId,
      };

      const checkAlreadyInCart = await Cart.findOne({
        where: {
          ProductId,
          UserId,
        },
      });

      if (checkAlreadyInCart) {
        res.status(200).json({
          updateId: checkAlreadyInCart.id,
        });
      } else {
        const data = await Cart.create(newCart);

        if (!data) throw err;

        res.status(201).json(data);
      }
    } catch (err) {
      next(err);
    }
  }

  static async getCart(req, res, next) {
    try {
      const UserId = req.decoded.id;

      const data = await Cart.findAll({
        where: { UserId },
        include: ['Product'],
        order: [['id', 'ASC']],
      });

      if (!data) throw err;

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async changeQuantity(req, res, next) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const data = await Cart.findByPk(id);

      if (!data) throw err;

      const newQuantity = data.quantity + quantity;

      if (newQuantity <= 0)
        throw {
          name: 'CustomError',
          msg: 'Minimum quantity to buy should be 1',
          status: 400,
        };

      const newTotalPrice = (data.total_price / data.quantity) * newQuantity;

      const productData = await Product.findByPk(data.ProductId);

      if (!productData) throw err;

      if (productData.stock < newQuantity)
        throw {
          name: 'CustomError',
          msg: 'You exceeded maximum stock',
          status: 400,
        };

      const updatedQuantity = await Cart.update(
        {
          quantity: newQuantity,
        },
        {
          where: { id },
          returning: true,
        }
      );

      if (!updatedQuantity) throw err;

      const updatedTotalPrice = await Cart.update(
        {
          total_price: newTotalPrice,
        },
        {
          where: { id },
          returning: true,
        }
      );

      if (!updatedTotalPrice) throw err;

      res.status(200).json({
        msg: 'The quantity has been updated',
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCart(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Cart.destroy({
        where: { id },
      });

      if (!data) throw err;

      res.status(200).json({
        msg: 'A product has been deleted from your cart',
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CartController;
