'use strict';
const Controller = require('egg').Controller;
const indexRule = {
  page: { type: 'string', allowEmpty: true },
  rows: { type: 'string', allowEmpty: true },
  title: { type: 'string', required: false, allowEmpty: true },
};
const createRule = {
  title: { type: 'string', allowEmpty: true },
  url: { type: 'string', allowEmpty: true },
  imgUrl: 'string',
  description: { type: 'string', allowEmpty: true },
};

class BannerController extends Controller {
  /**
 * @api {get} /banner 分页查询标题栏
 * @apiName banner
 * @apiGroup Banner
 *
 * @apiParam {Integer} page 起始页
 * @apiParam {Integer} rows 每页条数
 * @apiParam {String} title 标题
 *
 * @apiSuccess {ObjectId} _id 标题id
 * @apiSuccess {String} title 标题
 * @apiSuccess {String} description 标题描述
 * @apiSuccess {String} imgUrl 图片路径
 * @apiSuccess {String} url 标题地址
 * @apiSuccess {Date} createdAt 标题创建时间
 * @apiSuccess {Date} updatedAt 标题修改时间
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '查询标题栏成功',
 *       data: {
 *          banner: [{
 *             _id: '5tret4656557frt466',
 *             title: '国科',
 *             url: '/index',
 *             imgUrl: 'public/upload/2018-5-2/default.jpg'
 *             createdAt: '2018-5-2 0:0:0',
 *             updatedAt: '2018-5-2 0:0:0'
 *          }],
 *          total: 1
 *       }
 *     }
 *
 * @apiError 500 查询标题栏失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '查询标题栏失败'
 *     }
 */
  async index() {
    const { ctx, service } = this;
    const query = ctx.query;
    ctx.validate(indexRule, query);
    const result = await service.banner.index(query);
    if (result) ctx.success(result, '查询标题栏成功'); else ctx.fail('查询标题栏失败');
  }

  /**
 * @api {post} /banner 新增标题栏
 * @apiName banner/new
 * @apiGroup Banner
 *
 * @apiParam {String} title 标题 required
 * @apiParam {String} description 标题描述
 * @apiParam {String} url 标题地址 required
 * @apiParam {String} imgUrl 标题图片路径 required
 *
 * @apiSuccess {ObjectId} _id 标题id
 * @apiSuccess {String} title 标题
 * @apiSuccess {String} description 标题描述
 * @apiSuccess {String} url 标题地址
 * @apiSuccess {String} imgUrl 图片路径
 * @apiSuccess {Date} createdAt 标题创建时间
 * @apiSuccess {Date} updatedAt 标题修改时间
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '新增标题成功',
 *       data: {
 *        _id: '5tret4656557frt466',
 *        title: '国科',
 *        url: '/index',
 *        description: '国科详情',
 *        imgUrl: '/public/upload/2018-5-2/default.jpg',
 *        createdAt: '2018-5-2 0:0:0',
 *        updatedAt: '2018-5-2 0:0:0'
 *       }
 *     }
 *
 * @apiError 500 新增标题失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '新增标题失败'
 *     }
 */
  async create() {
    const { ctx, service } = this;
    ctx.validate(createRule);
    const banner = await service.banner.create(ctx.request.body);
    if (banner) ctx.success(banner, '新增标题栏成功'); else ctx.fail('新增标题栏失败');
  }

  /**
 * @api {put} /banner/:id 修改标题栏
 * @apiName banner/update
 * @apiGroup Banner
 *
 * @apiParam {String} title 标题 required
 * @apiParam {String} url 标题地址 required
 * @apiParam {String} description 标题路径
 * @apiParam {String} imgUrl 图片路径 required
 *
 * @apiSuccess {String} title 标题
 * @apiSuccess {String} url 标题地址
 * @apiSuccess {String} description 标题描述
 * @apiSuccess {String} imgUrl 图片路径
 * @apiSuccess {Date} createdAt 标题创建时间
 * @apiSuccess {Date} updatedAt 标题修改时间
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '修改标题成功',
 *       data: {
 *         "ok": 1,
 *         "nModified": 1,
 *         "n": 1
 *       }
 *     }
 *
 * @apiError 500 修改标题失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '修改标题失败'
 *     }
 */
  async update() {
    const { ctx, service } = this;
    ctx.validate(createRule);
    const result = await service.banner.update(ctx.params.id, ctx.request.body);
    if (result) ctx.success(result, '修改标题栏成功'); else ctx.fail('修改标题栏失败');
  }

  /**
 * @api {delete} /banner/:id 删除标题栏
 * @apiName banner/delete
 * @apiGroup Banner
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '删除标题栏成功',
 *       data: {
 *         "ok": 1,
 *         "nModified": 1,
 *         "n": 1
 *       }
 *     }
 *
 * @apiError 500 删除标题栏失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '删除标题栏失败'
 *     }
 */
  async destroy() {
    const { ctx, service } = this;
    const result = await service.banner.destroy(ctx.params.id);
    if (result) ctx.success(result, '删除标题栏成功'); else ctx.fail('删除标题栏失败');
  }

  /**
 * @api {get} /banner/list 查询所有标题栏
 * @apiName banner/list
 * @apiGroup Banner
 *
 * @apiSuccess {ObjectId} _id 标题id
 * @apiSuccess {String} title 标题
 * @apiSuccess {String} url 标题地址
 * @apiSuccess {String} description 标题描述
 * @apiSuccess {String} imgUrl 图片路径
 * @apiSuccess {Date} createdAt 标题创建时间
 * @apiSuccess {Date} updatedAt 标题修改时间
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '查询标题栏成功',
 *       data: [{
 *        _id: '5tret4656557frt466',
 *        title: '国科',
 *        description: '国科详情',
 *        url: '/index',
 *        imgUrl: 'public/upload/2018-5-2/default.jpg',
 *        createdAt: '2018-5-2 0:0:0',
 *        updatedAt: '2018-5-2 0:0:0'
 *       }]
 *     }
 *
 * @apiError 500 查询标题栏失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '查询标题栏失败'
 *     }
 */
  async list() {
    const { ctx, service } = this;
    const banner = await service.banner.list();
    if (banner) ctx.success(banner, '查询标题栏成功'); else ctx.fail('查询标题栏失败');
  }

  /**
 * @api {get} /banner/:id/edit 根据id查询标题栏
 * @apiName banner/edit
 * @apiGroup Banner
 *
 * @apiSuccess {ObjectId} _id 标题id
 * @apiSuccess {String} title 标题
 * @apiSuccess {String} url 标题地址
 * @apiSuccess {String} description 标题描述
 * @apiSuccess {String} imgUrl 图片路径
 * @apiSuccess {Date} createdAt 标题创建时间
 * @apiSuccess {Date} updatedAt 标题修改时间
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '查询标题栏成功',
 *       data: {
 *        _id: '5tret4656557frt466',
 *        title: '国科',
 *        description: '国科详情',
 *        url: '/index',
 *        imgUrl: 'public/upload/2018-5-2/default.jpg',
 *        createdAt: '2018-5-2 0:0:0',
 *        updatedAt: '2018-5-2 0:0:0'
 *       }
 *     }
 *
 * @apiError 500 查询标题栏失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '查询标题栏失败'
 *     }
 */
  async edit() {
    const { ctx, service } = this;
    const banner = await service.banner.edit(ctx.params.id);
    if (banner) ctx.success(banner, '查询标题栏成功'); else ctx.fail('查询标题栏失败');
  }
}

module.exports = BannerController;
