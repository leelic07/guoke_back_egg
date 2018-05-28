'use strict';
const Service = require('egg').Service;

class UsersService extends Service {
  async index(pagination) {
    const { ctx } = this;
    const page = parseInt(pagination.page) || 1;
    const rows = parseInt(pagination.rows) || 10;
    const skip = (page - 1) * rows;
    const condition = {};
    pagination.userName && Object.assign(condition, { userName: pagination.userName });
    const users = await ctx.model.Users.findAndCount({
      where: condition,
      limit: rows,
      offset: skip,
    });
    return users;
  }

  async show(_id) {
    const { ctx } = this;
    const user = await ctx.model.Users.findById(_id);
    return user;
  }

  async login(user) {
    const { ctx } = this;
    const result = await ctx.model.Users.findOne({
      where: user,
    });
    return result;
  }

  async resetPwd(password) {
    const { ctx } = this;
    const _id = ctx.session.userId;
    const newPassword = ctx.helper.md5(password.newPassword);
    const oldPassword = ctx.helper.md5(password.oldPassword);
    const result = await ctx.model.Users.update({ password: newPassword }, {
      where: { password: oldPassword, _id },
      limit: 1,
    });
    return result;
  }

  async register(user) {
    const { ctx } = this;
    user.password = ctx.helper.md5(user.password);
    const result = await ctx.model.Users.create(user);
    return result;
  }
}

module.exports = UsersService;
