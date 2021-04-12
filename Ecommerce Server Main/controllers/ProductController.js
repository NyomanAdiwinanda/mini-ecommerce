const { Product } = require('../models');

class ProductController {
  static async createProduct(req, res, next) {
    try {
      const UserId = req.decoded.id;
      const { name, image_url, price, stock, category } = req.body;

      const newProduct = {
        name,
        image_url,
        price,
        stock,
        category,
        UserId,
      };

      const data = await Product.create(newProduct);

      if (!data) throw err;

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getProduct(req, res, next) {
    try {
      const { UserId, id } = req.query;
      if (UserId) {
        const data = await Product.findAll({
          where: { UserId },
        });

        if (!data) throw err;

        res.status(200).json(data);
      } else if (id) {
        const data = await Product.findAll({
          where: { id },
        });

        if (!data) throw err;

        res.status(200).json(data);
      } else {
        const data = await Product.findAll();

        if (!data) throw err;

        res.status(200).json(data);
      }
    } catch (err) {
      next(err);
    }
  }

  static async editProduct(req, res, next) {
    try {
      const UserId = req.decoded.id;
      const { id } = req.params;
      const { name, image_url, price, stock, category } = req.body;

      const editedProduct = {
        name,
        image_url,
        price,
        stock,
        category,
        UserId,
      };

      const data = await Product.update(editedProduct, {
        where: { id },
        returning: true,
      });

      if (!data) throw err;

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Product.destroy({
        where: { id },
        returning: true,
      });

      if (!data) throw err;

      res.status(200).json({
        msg: 'Product deleted',
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
