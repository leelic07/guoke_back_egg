'use strict';
const Service = require('egg').Service;

class BannerService extends Service {
  async index(pagination) {
    const { ctx } = this;
    const page = parseInt(pagination.page) || 1;
    const rows = parseInt(pagination.rows) || 10;
    const skip = (page - 1) * rows;
    const condition = {};
    pagination.title && Object.assign(condition, { title: pagination.title });
    const banners = ctx.model.Banner.findAndCount({
      where: condition,
      limit: rows,
      offset: skip,
    });
    return banners;
  }

  async create(banner) {
    const { ctx } = this;
    const result = await ctx.model.Banner.create(banner);
    return result;
  }

  async update(_id, banner) {
    const { ctx } = this;
    const result = await ctx.model.Banner.update(banner, {
      where: { _id },
      limit: 1,
    });
    return result;
  }

  async destroy(_id) {
    const { ctx } = this;
    const result = await ctx.model.Banner.destroy({
      where: { _id },
      limit: 1,
    });
    return result;
  }

  async list() {
    const { ctx } = this;
    const banners = await ctx.model.Banner.findAll();
    return banners;
  }

  async edit(_id) {
    const { ctx } = this;
    const banner = await ctx.model.Banner.findById(_id);
    return banner;
  }
}

module.exports = BannerService;
