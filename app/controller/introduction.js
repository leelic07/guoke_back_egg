'use strict';
const Controller = require('egg').Controller;
const indexRule = {
  page: { type: 'string', allowEmpty: true },
  rows: { type: 'string', allowEmpty: true },
  title: { type: 'string', required: false, allowEmpty: true },
};
const createRule = {
  title: 'string',
  content: 'string',
  images: { type: 'array', itemType: 'object', min: 0 },
};

class IntroductionController extends Controller {
  /**
 * @api {get} /introduction 分页查询简介
 * @apiName introduction
 * @apiGroup Introduction
 *
 * @apiParam {Integer} page 起始页
 * @apiParam {Integer} rows 每页条数
 * @apiParam {String} title 公司简介标题
 *
 * @apiSuccess {ObjectId} _id 简介id
 * @apiSuccess {String} title 公司简介标题
 * @apiSuccess {String} content 公司简介内容
 * @apiSuccess {Array} images 公司简介图片数组
 * @apiSuccess {Date} createdAt 简介创建时间
 * @apiSuccess {Date} updatedAt 简介修改时间
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '查询简介成功',
 *       data: {
 *          introduction: [{
 *             _id: '5tret4656557frt466',
 *             title: '国科政信科技(北京)股份有限公司是一家大型软件研发企业',
 *             content: '主要从事与军政法系相关的管理和办公软件的开发,同时还负担国家国防科工局以及其他部分软件开发重任。',
 *             images: [{
 *               "fieldname": "file",
 *               "originalname": "default.jpg",
 *               "encoding": "7bit",
 *               "mimetype": "image/jpeg",
 *               "destination": "public/upload/2018-4-3",
 *               "filename": "file-1525241755117.jpg",
 *               "path": "public\\upload\\2018-4-3\\default-1525241755117.jpg",
 *               "size": 20267
 *              }]
 *             createdAt: '2018-5-2 0:0:0',
 *             updatedAt: '2018-5-2 0:0:0'
 *          }],
 *          total: 1
 *       }
 *     }
 *
 * @apiError 500 查询简介失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '查询简介失败'
 *     }
 */
  async index() {
    const { ctx, service } = this;
    const query = ctx.query;
    ctx.validate(indexRule, query);
    const result = await service.introduction.index(query);
    if (result) {
      result.images = result.images.split(',');
      ctx.success(result, '查询简介成功');
    } else ctx.fail('查询简介失败');
  }

  /**
 * @api {post} /introduction 新增简介
 * @apiName introduction/new
 * @apiGroup Introduction
 *
 * @apiParam {String} title 公司简介标题 required
 * @apiParam {String} content 公司简介内容 required
 * @apiParam {Array} images 公司简介图片数组 required
 *
 * @apiSuccess {ObjectId} _id 简介id
 * @apiSuccess {String} title 公司简介标题
 * @apiSuccess {String} content 公司简介内容
 * @apiSuccess {Array} images 公司简介图片数组
 * @apiSuccess {Date} createdAt 简介创建时间
 * @apiSuccess {Date} updatedAt 简介修改时间
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '新增简介成功',
 *       data: {
 *         _id: '5tret4656557frt466',
 *         title: '国科政信科技(北京)股份有限公司是一家大型软件研发企业',
 *         content: '主要从事与军政法系相关的管理和办公软件的开发,同时还负担国家国防科工局以及其他部分软件开发重任。',
 *         images: [{
 *           "fieldname": "file",
 *           "originalname": "default.jpg",
 *           "encoding": "7bit",
 *           "mimetype": "image/jpeg",
 *           "destination": "public/upload/2018-4-3",
 *           "filename": "file-1525241755117.jpg",
 *           "path": "public\\upload\\2018-4-3\\default-1525241755117.jpg",
 *           "size": 20267
 *          }]
 *         createdAt: '2018-5-2 0:0:0',
 *         updatedAt: '2018-5-2 0:0:0'
 *       }
 *     }
 *
 * @apiError 500 新增简介失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '新增简介失败'
 *     }
 */
  async create() {
    const { ctx, service } = this;
    ctx.validate(createRule);
    const introduction = await service.introduction.create(ctx.request.body);
    if (introduction) ctx.success(introduction, '新增简介成功'); else ctx.fail('新增简介失败');
  }

  /**
 * @api {put} /introduction/:id 修改简介
 * @apiName introduction/update
 * @apiGroup Introduction
 *
 * @apiParam {String} title 公司简介标题 required
 * @apiParam {String} content 公司简介内容 required
 * @apiParam {Array} images 公司简介图片数组 required
 *
 * @apiSuccess {ObjectId} _id 简介id
 * @apiSuccess {String} title 公司简介标题
 * @apiSuccess {String} content 公司简介内容
 * @apiSuccess {Array} images 公司简介图片数组
 * @apiSuccess {Date} createdAt 简介创建时间
 * @apiSuccess {Date} updatedAt 简介修改时间
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '修改简介成功',
 *       data: {
 *         "ok": 1,
 *         "nModified": 1,
 *         "n": 1
 *       }
 *     }
 *
 * @apiError 500 修改简介失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '修改简介失败'
 *     }
 */
  async update() {
    const { ctx, service } = this;
    ctx.validate(createRule);
    const result = await service.introduction.update(ctx.params.id, ctx.request.body);
    if (result) ctx.success(result, '修改简介成功'); else ctx.fail('修改简介失败');
  }

  /**
 * @api {delete} /introduction/:id 删除简介
 * @apiName introduction/delete
 * @apiGroup Introduction
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '删除简介成功',
 *       data: {
 *         "ok": 1,
 *         "nModified": 1,
 *         "n": 1
 *       }
 *     }
 *
 * @apiError 500 删除简介失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '删除简介失败'
 *     }
 */
  async destroy() {
    const { ctx, service } = this;
    const result = await service.introduction.destroy(ctx.params.id);
    if (result) ctx.success(result, '删除简介成功'); else ctx.fail('删除简介失败');
  }

  /**
 * @api {get} /introduction/:id/edit 根据id查询简介
 * @apiName introduction/edit
 * @apiGroup Introduction
 *
 * @apiSuccess {ObjectId} _id 简介id
 * @apiSuccess {String} title 公司简介标题
 * @apiSuccess {String} content 公司简介内容
 * @apiSuccess {Array} images 公司简介图片数组
 * @apiSuccess {Date} createdAt 简介创建时间
 * @apiSuccess {Date} updatedAt 简介修改时间
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '查询简介成功',
 *       data: {
 *         _id: '5tret4656557frt466',
 *         title: '国科政信科技(北京)股份有限公司是一家大型软件研发企业',
 *         content: '主要从事与军政法系相关的管理和办公软件的开发,同时还负担国家国防科工局以及其他部分软件开发重任。',
 *         images: [{
 *           "fieldname": "file",
 *           "originalname": "default.jpg",
 *           "encoding": "7bit",
 *           "mimetype": "image/jpeg",
 *           "destination": "public/upload/2018-4-3",
 *           "filename": "file-1525241755117.jpg",
 *           "path": "public\\upload\\2018-4-3\\default-1525241755117.jpg",
 *           "size": 20267
 *          }]
 *         createdAt: '2018-5-2 0:0:0',
 *         updatedAt: '2018-5-2 0:0:0'
 *       }
 *     }
 *
 * @apiError 500 查询简介失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '查询简介失败'
 *     }
 */
  async edit() {
    const { ctx, service } = this;
    const introduction = await service.introduction.edit(ctx.params.id);
    if (introduction) {
      introduction.images = introduction.images.split(',');
      ctx.success(introduction, '查询简介成功');
    } else ctx.fail('查询简介失败');
  }

  /**
 * @api {get} /introduction/list 查询所有简介
 * @apiName introduction/list
 * @apiGroup Introduction
 *
 * @apiSuccess {ObjectId} _id 简介id
 * @apiSuccess {String} title 公司简介标题
 * @apiSuccess {String} content 公司简介内容
 * @apiSuccess {Array} images 公司简介图片数组
 * @apiSuccess {Date} createdAt 简介创建时间
 * @apiSuccess {Date} updatedAt 简介修改时间
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 200,
 *       msg: '查询简介成功',
 *       data: [{
 *         _id: '5tret4656557frt466',
 *         title: '国科政信科技(北京)股份有限公司是一家大型软件研发企业',
 *         content: '主要从事与军政法系相关的管理和办公软件的开发,同时还负担国家国防科工局以及其他部分软件开发重任。',
 *         images: [{
 *           "fieldname": "file",
 *           "originalname": "default.jpg",
 *           "encoding": "7bit",
 *           "mimetype": "image/jpeg",
 *           "destination": "public/upload/2018-4-3",
 *           "filename": "file-1525241755117.jpg",
 *           "path": "public\\upload\\2018-4-3\\default-1525241755117.jpg",
 *           "size": 20267
 *          }]
 *         createdAt: '2018-5-2 0:0:0',
 *         updatedAt: '2018-5-2 0:0:0'
 *       }]
 *     }
 *
 * @apiError 500 查询简介失败
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       code: 500,
 *       msg: '查询简介失败'
 *     }
 */
  async list() {
    const { ctx, service } = this;
    const introduction = await service.introduction.list();
    if (introduction) {
      introduction.images = introduction.images.split(',');
      ctx.success(introduction, '查询简介成功');
    } else ctx.fail('查询简介失败');
  }
}

module.exports = IntroductionController;
