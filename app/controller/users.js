'use strict';
const Controller = require('egg').Controller;
const indexRule = {
  page: { type: 'string', allowEmpty: true },
  rows: { type: 'string', allowEmpty: true },
  userName: { type: 'string', allowEmpty: true },
};
const createRule = {
  userName: 'string',
  password: 'password',
};
const updateRule = {
  oldPassword: 'password',
  newPassword: 'password',
};

class UsersController extends Controller {
  async index() {
    const { ctx, service } = this;
    ctx.validate(indexRule, ctx.query);
    const users = await service.users.index(ctx.query);
    if (users) ctx.success(users, '查询用户成功');
    else ctx.fail('查询用户失败');
  }

  async show() {
    const { ctx, service } = this;
    const user = await service.users.show(ctx.params.id);
    if (user) ctx.success(user, '查询用户成功');
    else ctx.fail('查询用户失败');
  }

  /**
 * @api {post} /resetPwd 修改用户密码
 * @apiName restPwd
 * @apiGroup Users
 *
 * @apiParam {String} oldPassword 用户名 required
 * @apiParam {String} newPassword 用户密码 required
 *
 * @apiSuccess {ObjectId} _id 用户id
 * @apiSuccess {String} userName 用户名
 * @apiSuccess {Date} createdAt 用户创建时间
 * @apiSuccess {Date} updatedAt 用户修改时间
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '修改用户密码成功',
 *       data: {
 *         "ok": 1,
 *         "nModified": 1,
 *         "n": 1
 *        }
 *      }
 *
 * @apiError 500 修改用户密码失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '修改用户密码失败'
 *     }
 */
  async resetPwd() {
    const { ctx, service } = this;
    ctx.validate(updateRule);
    const result = await service.users.resetPwd(ctx.request.body);
    if (result) ctx.success(result, '修改用户密码成功'); else ctx.fail('修改用户密码失败');
  }

  /**
 * @api {post} /login 用户登录
 * @apiName login
 * @apiGroup Users
 *
 * @apiParam {String} userName 用户名 required
 * @apiParam {String} password 用户密码 required
 *
 * @apiSuccess {ObjectId} _id 用户id
 * @apiSuccess {String} userName 用户名
 * @apiSuccess {Date} createdAt 用户创建时间
 * @apiSuccess {Date} updatedAt 用户修改时间
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '用户登录成功',
 *       data: {
 *        _id: '5tret4656557frt466',
 *        userName: 'admin',
 *        createdAt: '2018-5-2 0:0:0',
 *        updatedAt: '2018-5-2 0:0:0'
 *       }
 *     }
 *
 * @apiError 500 用户名或者密码不正确
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '用户名或者密码不正确'
 *     }
 */
  async login() {
    const { ctx, service } = this;
    const user = ctx.request.body;
    ctx.validate(createRule);
    user.password = ctx.helper.md5(user.password);
    const result = await service.users.login(user);
    if (result) {
      ctx.session.userId = result._id;
      delete result.dataValues.password;
      ctx.success(result, '登录成功');
    } else {
      ctx.fail('用户名或密码不正确');
    }
  }

  /**
 * @api {post} /logout 退出登录
 * @apiName logout
 * @apiGroup Users
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '退出登录成功',
 *       data: {}
 *     }
 *
 * @apiError 500 退出登录失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '退出登录失败'
 *     }
 */
  async logout() {
    const { ctx } = this;
    ctx.session = null;
    if (!ctx.session) {
      ctx.success({}, '退出登录成功');
    } else ctx.fail('退出登录失败');
  }

  /**
 * @api {post} /register 用户注册
 * @apiName register
 * @apiGroup Users
 *
 * @apiParam {String} userName 用户名 required
 * @apiParam {String} password 用户密码 required
 *
 * @apiSuccess {ObjectId} _id 用户id
 * @apiSuccess {String} userName 用户名
 * @apiSuccess {Date} createdAt 用户创建时间
 * @apiSuccess {Date} updatedAt 用户修改时间
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '注册用户成功',
 *        _id: '5tret4656557frt466',
 *        userName: 'admin',
 *        createdAt: '2018-5-2 0:0:0',
 *        updatedAt: '2018-5-2 0:0:0'
 *       }
 *     }
 *
 * @apiError 500 注册用户失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '注册用户失败'
 *     }
 */
  async register() {
    const { ctx, service } = this;
    ctx.validate(createRule);
    const user = await service.users.register(ctx.request.body);
    if (user) {
      ctx.success({
        userName: user.userName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }, '注册用户成功');
    } else ctx.fail('注册用户失败');
  }
}

module.exports = UsersController;
