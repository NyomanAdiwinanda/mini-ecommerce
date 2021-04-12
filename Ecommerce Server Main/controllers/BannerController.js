const { Banner } = require('../models');

class BannerController {
  static async createBanner(req, res, next) {
    try {
      const UserId = req.decoded.id;
      const { title, status, image_url } = req.body;

      const newBanner = {
        title,
        status,
        image_url,
        UserId,
      };

      const data = await Banner.create(newBanner);

      if (!data) throw err;

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getBanner(req, res, next) {
    try {
      const { UserId, id } = req.query;
      if (UserId) {
        const data = await Banner.findAll({
          where: { UserId },
        });

        if (!data) throw err;

        res.status(200).json(data);
      } else if (id) {
        const data = await Banner.findAll({
          where: { id },
        });

        if (!data) throw err;

        res.status(200).json(data);
      } else {
        const data = await Banner.findAll();

        if (!data) throw err;

        res.status(200).json(data);
      }
    } catch (err) {
      next(err);
    }
  }

  static async editBanner(req, res, next) {
    try {
      const UserId = req.decoded.id;
      const { id } = req.params;
      const { title, status, image_url } = req.body;

      const editedBanner = {
        title,
        status,
        image_url,
        UserId,
      };

      const data = await Banner.update(editedBanner, {
        where: { id },
        returning: true,
      });

      if (!data) throw err;

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteBanner(req, res, next) {
    try {
      const { id } = req.params;

      const data = await Banner.destroy({
        where: { id },
        returning: true,
      });

      if (!data) throw err;

      res.status(200).json({
        msg: 'Banner deleted',
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BannerController;
