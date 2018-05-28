'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const upload = app.middleware.multer();// 上传文件中间件
  router.get('/', controller.home.index);
  // 登录
  router.post('/login', controller.users.login);
  // 退出登录
  router.post('/logout', controller.users.logout);
  // 修改密码
  router.post('/resetPwd', controller.users.resetPwd);
  // 用户注册
  router.post('/register', controller.users.register);
  // 用户路由
  router.resources('users', '/users', controller.users);
  // 上传文件
  router.post('/upload', upload.single('file'), controller.upload.uploadFile);
  // 导航管理
  router.resources('navigation', '/navigation', controller.navigation);
  // 获取所有导航数据
  router.get('/navigation/list', controller.navigation.list);
  // 标题栏管理
  router.resources('banner', '/banner', controller.banner);
  // 查询所有标题栏
  router.get('/banner/list', controller.banner.list);
  // 基本信息管理
  router.resources('information', '/information', controller.information);
  // 查询所有基本信息
  router.get('/information/list', controller.information.list);
  // 解决方案管理
  router.resources('solution', '/solution', controller.solution);
  // 查询所有解决方案
  router.get('/solution/list', controller.solution.list);
  // 公司简介管理
  router.resources('introduction', '/introduction', controller.introduction);
  // 查询所有公司简介
  router.get('/introduction/list', controller.introduction.list);
  // 解决方案详情管理
  router.resources('solutionDetail', '/solution-detail', controller.solutionDetail);
};
