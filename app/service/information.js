'use strict';
const Service = require('egg').Service;

class InformationService extends Service {
  async index(pagination) {
    const { ctx } = this;
    const page = parseInt(pagination.page) || 1;
    const rows = parseInt(pagination.rows) || 10;
    const skip = (page - 1) * rows;
    const information = await ctx.model.Information.findAndCount({
      limit: rows,
      offset: skip,
    });
    return information;
  }

  async create(information) {
    const { ctx } = this;
    const result = await ctx.model.Information.create(information);
    return result;
  }

  async update(_id, information) {
    const { ctx } = this;
    const result = await ctx.model.Information.update(information, {
      where: { _id },
      limit: 1,
    });
    return result;
  }

  async destroy(_id) {
    const { ctx } = this;
    const result = await ctx.model.Information.destroy({
      where: { _id },
      limit: 1,
    });
    return result;
  }

  async edit(_id) {
    const { ctx } = this;
    const information = await ctx.model.Information.findById(_id);
    return information;
  }

  async list() {
    const { ctx } = this;
    const information = await ctx.model.Information.findAll();
    return information;
  }
}

module.exports = InformationService;
