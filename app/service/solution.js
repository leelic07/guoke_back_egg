'use strict';
const Service = require('egg').Service;

class SolutionService extends Service {
  async index(pagination) {
    const { ctx } = this;
    const page = parseInt(pagination.page) || 1;
    const rows = parseInt(pagination.rows) || 10;
    const skip = (page - 1) * rows;
    const condition = {};
    pagination.title && (condition.title = { $like: `%${pagination.title}%` });
    const solutions = await ctx.model.Solution.findAndCount({
      where: condition,
      limit: rows,
      offset: skip,
    });
    return solutions;
  }

  async create(solution) {
    const { ctx } = this;
    const result = await ctx.model.Solution.create(solution);
    return result;
  }

  async update(_id, solution) {
    const { ctx } = this;
    const result = await ctx.model.Solution.update(solution, {
      where: { _id },
    });
    return result;
  }

  async destroy(_id) {
    const { ctx } = this;
    const result = await ctx.model.Solution.destroy({
      where: { _id },
    });
    return result;
  }

  async list() {
    const { ctx } = this;
    const solutions = await ctx.model.Solution.findAll();
    return solutions;
  }

  async edit(_id) {
    const { ctx } = this;
    const solution = await ctx.model.Solution.findOne({
      where: { _id },
      include: [ ctx.model.SolutionDetail ],
    });
    return solution;
  }
}

module.exports = SolutionService;
