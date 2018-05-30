'use strict';
const Service = require('egg').Service;

class IntroductionService extends Service {
  async index(pagination) {
    const { ctx } = this;
    const page = parseInt(pagination.page) || 1;
    const rows = parseInt(pagination.rows) || 10;
    const skip = (page - 1) * rows;
    const condition = {};
    pagination.title && (condition.title = { $like: `%${pagination.title}%` });
    const introductions = await ctx.model.Introduction.findAndCount({
      where: condition,
      limit: rows,
      offset: skip,
    });
    return introductions;
  }

  async create(introduction) {
    const { ctx } = this;
    const result = await ctx.model.Introduction.create(introduction);
    return result;
  }

  async update(_id, introduction) {
    const { ctx } = this;
    const result = await ctx.model.Introduction.update(introduction, {
      where: { _id },
      limit: 1,
    });
    return result;
  }

  async destroy(_id) {
    const { ctx } = this;
    const result = await ctx.model.Introduction.destroy({
      where: { _id },
      limit: 1,
    });
    return result;
  }

  async edit(_id) {
    const { ctx } = this;
    const introduction = await ctx.model.Introduction.findById(_id);
    return introduction;
  }

  async list() {
    const { ctx } = this;
    const introduction = await ctx.model.Introduction.findAll();
    return introduction;
  }
}

module.exports = IntroductionService;
