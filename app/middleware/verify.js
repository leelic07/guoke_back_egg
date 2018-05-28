'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const userId = ctx.session.userId;
    const path = ctx.path;
    const publicPath = new RegExp('^/public');
    const listPath = path.substring(path.lastIndexOf('/'));
    const sulutionPath = new RegExp('^/solution-detail.*/edit$');
    if (path === '/login' || path === '/register' || publicPath.test(path) || listPath === '/list' || sulutionPath.test(path)) {
      await next();
    } else {
      if (userId) {
        const result = await ctx.model.Users.findById(userId);
        if (result) {
          await next();
        } else {
          ctx.body = {
            code: 400,
            msg: '用户未登录',
          };
        }
      } else {
        ctx.body = {
          code: 400,
          msg: '用户未登录',
        };
      }
    }
  };
};
