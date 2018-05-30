'use strict';
const Service = require('egg').Service;

class SolutionDetailService extends Service {
  async index(pagination) {
    const { ctx } = this;
    const page = parseInt(pagination.page) || 1;
    const rows = parseInt(pagination.rows) || 10;
    const skip = (page - 1) * rows;
    const condition = {};
    pagination.introduction && (condition.introduction = pagination.introduction);
    const solutionDetails = ctx.model.SolutionDetail.findAndCount({
      where: condition,
      limit: rows,
      offset: skip,
    });
    return solutionDetails;
  }

  async create(solutionDetail) {
    const { ctx } = this;
    // const solutionId = solutionDetail.solutionId;
    const result = ctx.model.SolutionDetail.create(solutionDetail);
    return result;
  }

  async update(_id, solutionDetail) {
    const { ctx } = this;
    const result = ctx.model.SolutionDetail.update(solutionDetail, {
      where: { _id },
    });
    return result;
  }

  async destroy(_id) {
    const { ctx } = this;
    const result = ctx.model.SolutionDetail.destroy({
      where: { _id },
    });
    return result;
  }

  async edit(_id) {
    const { ctx } = this;
    const solutionDetail = ctx.model.SolutionDetail.findOne({
      where: { solutionId: _id },
      include: [ ctx.model.Solution ],
    });
    return solutionDetail;
  }

  async show(_id) {
    const { ctx } = this;
    const solutionDetail = await ctx.model.SolutionDetail.findOne({
      where: { _id },
      include: [ ctx.model.Solution ],
    });
    return solutionDetail;
  }
}

module.exports = SolutionDetailService;
