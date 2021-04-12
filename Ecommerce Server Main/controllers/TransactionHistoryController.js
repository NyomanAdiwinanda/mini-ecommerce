const { TransactionHistory, Cart, Product } = require('../models');

class TransactionHistoryController {
  static async createTransactionHistory(req, res, next) {
    try {
      const UserId = req.decoded.id;

      const cartData = await Cart.findAll({
        where: { UserId },
      });

      if (!cartData) throw err;

      const newTransactionData = cartData.map((element) => {
        return {
          total_price: element.total_price,
          quantity: element.quantity,
          ProductId: element.ProductId,
          UserId: element.UserId,
        };
      });

      newTransactionData.forEach(async (element) => {
        const product = await Product.findByPk(element.ProductId);

        if (!product) throw err;

        let newStock = product.stock - element.quantity;

        if (newStock < 0)
          throw {
            name: 'CustomError',
            msg: "Some item don't have enough stocks",
            status: 400,
          };

        const updateStock = await Product.update(
          {
            stock: newStock,
          },
          {
            where: { id: element.ProductId },
          }
        );

        if (!updateStock) throw err;
      });

      const transactionData = await TransactionHistory.bulkCreate(
        newTransactionData
      );

      if (!transactionData) throw err;

      const deleteAllCart = await Cart.destroy({
        where: { UserId },
      });

      if (!deleteAllCart) throw err;

      res.status(201).json({
        msg: 'You have completed a transaction',
      });
    } catch (err) {
      next(err);
    }
  }

  static async getTransactionHistory(req, res, next) {
    try {
      const UserId = req.decoded.id;

      const data = await TransactionHistory.findAll({
        where: { UserId },
        include: ['Product'],
        order: [['id', 'DESC']],
      });

      if (!data) throw err;

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = TransactionHistoryController;
