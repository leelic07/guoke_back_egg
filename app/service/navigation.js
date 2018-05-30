'use strict';
const Service = require('egg').Service;

class NavigationService extends Service {
  async index(pagination) {
    const { ctx } = this;
    const page = parseInt(pagination.page) || 1;
    const rows = parseInt(pagination.rows) || 10;
    const skip = (page - 1) * rows;
    const condition = {};
    pagination.title && (condition.title = { $like: `%${pagination.title}%` });
    const navigations = await ctx.model.Navigation.findAndCount({
      where: condition,
      limit: rows,
      offset: skip,
    });
    return navigations;
  }

  async create(navigation) {
    const { ctx } = this;
    const result = await ctx.model.Navigation.create(navigation);
    return result;
  }

  async update(_id, navigation) {
    const { ctx } = this;
    const result = await ctx.model.Navigation.update(navigation, {
      where: { _id },
      limit: 1,
    });
    return result;
  }

  async destroy(_id) {
    const { ctx } = this;
    const result = await ctx.model.Navigation.destroy({
      where: { _id },
      limit: 1,
    });
    return result;
  }

  async list() {
    const { ctx } = this;
    const navigation = await ctx.model.Navigation.findAll();
    return navigation;
  }

  async edit(_id) {
    const { ctx } = this;
    const navigation = await ctx.model.Navigation.findById(_id);
    return navigation;
  }
}

module.exports = NavigationService;
